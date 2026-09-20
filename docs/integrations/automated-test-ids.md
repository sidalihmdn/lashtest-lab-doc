---
sidebar_position: 2
title: Automated test IDs
description: Tagging automated tests so their results match test cases in Lashtest Lab.
---

# Automated test IDs

For CI results to land on the right test case, each automated test must carry an identifier that
Lashtest Lab can match. That identifier travels in the JUnit XML as a property called
**`testbase_id`**.

:::note On the name
The property is spelled `testbase_id` because it predates the product's rename to Lashtest Lab. It
is an integration identifier, so it has been kept stable — using the old spelling is correct here.
:::

## How the match works

```
test case in Lashtest Lab
  automation_id: "tc-4f8a1b2c"
                          │
                          │  must be equal
                          ▼
test in your suite
  JUnit property: <property name="testbase_id" value="tc-4f8a1b2c"/>
```

The value of the test's `testbase_id` property must equal the `automation_id` of the test case.
Matching is exact — a typo produces an unmatched result, not a near miss.

:::warning Automation IDs are globally unique
An `automation_id` identifies one case across the whole product, not just within a project. If two
cases share an ID — even in different projects — results cannot be attributed reliably.

Establish a convention early. Prefixing with the case's own identifier is simplest:

```
tc-4f8a1b2c
```

Generate it from the case, copy it into your test, and keep them in sync.
:::

## Setting up a test case

In Lashtest Lab:

1. Open the test case that corresponds to your automated test.
2. Mark it **automated**.
3. Set its **Automation ID** to the identifier you will use in code.

The ID can be up to 500 characters. Something short and stable works best — you will be typing it
into test code.

## Injecting the ID into JUnit XML

The mechanism differs per framework, and some do not support JUnit properties at all. The
following are the same snippets the app shows on its CI integration page, ready to copy.

### pytest

Register the marker in `conftest.py` so pytest carries it into the XML:

```python
# conftest.py
def pytest_collection_modifyitems(items):
    for item in items:
        marker = item.get_closest_marker("testbase_id")
        if marker:
            item.user_properties.append(("testbase_id", marker.args[0]))
```

```python
# test_login.py
import pytest

@pytest.mark.testbase_id("tc-3f9a1c2b")
def test_login():
    assert True
```

Generate the XML with:

```bash
pytest --junitxml=results.xml
```

### Jest

Jest needs the ID in the test name, then the universal post-processor to inject it as a property:

```js
// jest.config.js
module.exports = {
  reporters: [["jest-junit", { outputDirectory: "test-results", outputName: "results.xml" }]]
}

// Encode ID in test name, then post-process XML (see Universal fallback)
test("Login test [tc-3f9a1c2b]", () => { /* ... */ })
```

### Playwright

Playwright emits annotations as JUnit properties natively — no extra configuration needed.

```js
// playwright.config.ts
export default { reporter: [["junit", { outputFile: "results.xml" }]] }

// login.spec.ts
test("Login test", async ({ page }) => {
  test.info().annotations.push({ type: "testbase_id", description: "tc-3f9a1c2b" })
})
```

### JUnit 5

Uses a tag, with the Surefire plugin generating the XML:

```java
@Tag("testbase_id=tc-3f9a1c2b")
@Test
void loginTest() {
    // ...
}
```

```bash
mvn test
```

### RSpec

Configure the JUnit formatter, then pass the ID as metadata:

```ruby
# spec/spec_helper.rb
RSpec.configure do |config|
  config.formatter = "RspecJunitFormatter"
end

# spec/login_spec.rb
RSpec.describe "Login", testbase_id: "tc-3f9a1c2b" do
  it "logs in successfully" do
    expect(true).to be true
  end
end
```

### Go

Go does not support JUnit properties natively, so use the universal fallback to inject IDs.

```go
func TestLogin(t *testing.T) {
    t.Log("testbase_id: tc-3f9a1c2b")
}
```

```bash
gotestsum --junitfile results.xml
```

### Cypress

Encode the ID in the test title, then use the universal fallback script:

```js
it("logs in [tc-3f9a1c2b]", () => {
  // ...
})
```

### Universal fallback

For any framework that cannot emit JUnit properties — Jest, Go, Cypress, or anything else — run
this between your test step and your upload step. It rewrites the XML, injecting a property from a
name-to-ID mapping:

```python
# inject_ids.py — run between test step and upload step
import xml.etree.ElementTree as ET

MAPPING = {
    "Login test": "tc-3f9a1c2b",
    "Signup test": "tc-4a1b2c3d",
}

tree = ET.parse("results.xml")
for testcase in tree.findall(".//testcase"):
    name = testcase.get("name", "")
    if name in MAPPING:
        props = ET.SubElement(testcase, "properties")
        prop = ET.SubElement(props, "property")
        prop.set("name", "testbase_id")
        prop.set("value", MAPPING[name])

tree.write("results-tagged.xml")
```

Keep the mapping and your test names in sync — a renamed test silently stops matching.

## Verifying it worked

After your first push, check the response:

```json
{
  "matched": 42,
  "total": 45,
  "unmatched": ["..."],
  "job_id": "..."
}
```

If `unmatched` is not empty, each entry names a test that could not be attributed. The endpoint's
error text points at the likely cause:

> *"Verify that the testbase_id property values match automation_id values in this project."*

Work through the list:

1. **Is the property present at all?** Inspect the JUnit XML your pipeline produced. A framework
   that silently drops unknown metadata is the most common cause.
2. **Does the value match exactly?** Compare against the case's automation ID character for
   character — watch for stray whitespace.
3. **Does the case exist in this project?** The API key is scoped to one project. A test for
   another project's case will not match.

## Changing an ID later

If you change a case's automation ID, update the test in the same change. Otherwise the next push
reports that test as unmatched, and the case stops receiving results — while continuing to look
perfectly normal in the interface, since nothing tells you a test *used to* match it.

This is why it is worth generating IDs once and leaving them alone.
