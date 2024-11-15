# simple-labeler

🌏 [**한국어**](README.md) | English

GitHub Actions to automatically add a label to pull requests

## Usage

1. Create a `.github/workflows/simple-labeler.yml` file:

```yml
name: Simple Labeler
on:
  pull_request:
    types: [opened, ready_for_review]
jobs:
  simple-labeler:
    runs-on: [ubuntu-latest]
    steps:
      - name: Label to PR
        uses: naver/simple-labeler@latest
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          labels: "D-3"
          duplicate: "D-*"
```

2. Specify the events to trigger in `on`. In this example above, a label is added when a PR is created or transitioned from Draft to open status. (Note: it does not trigger on Draft PR creation.)
3. When the specified event occurs, `simple-labeler` automatically adds the label specified in `labels`.

## Inputs

### `token`

**Required** GitHub token

### `labels`

**Required** Labels to add when the event occurs, separated by commas(,)

### `duplicate`

If a label matches this pattern(glob), no new label is added.

## License
```
Copyright (c) 2023-present NAVER Corp.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
