# simple-labeler

PR 에 자동으로 Label 을 추가해주는 간단한 Github Actions

## Usage

1. 아래와 같이 `.github/workflows/simple-labeler.yml` 파일을 작성합니다:

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

2. 원하는 이벤트를 `on` 에 명시합니다. 여기서는 PR 생성 시, Draft 에서 Open 상태로 전환 시 Label 을 추가합니다.
     (참고로, Draft 생성 시에는 발생하지 않습니다.)
3. 해당 이벤트가 발생하면 GitHub Actions 가 자동으로 `labels`에 입력한 Label 을 추가합니다.

## Inputs

### `token`

**Required** GitHub에서 제공하는 토큰

### `labels`

**Required** 이벤트 발생 시 추가할 Label 목록. 콤마(,)로 구분

### `duplicate`

기존에 붙은 Label 중 이 패턴과 일치하는 것이 있다면 새 Label을 추가하지 않습니다. (glob 패턴 사용)

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
