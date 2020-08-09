# appolo-server-tutorial

## run

- npm install
- npm run start:dev
- http://localhost:4000/graphql
  - please read `DOCS`

## inputについて

- inputのtypeはQueryとMutationで必ず分ける
  - https://www.apollographql.com/docs/apollo-server/schema/schema/#input-types

## スキーマ駆動開発

- データストアに、クライアントがまだ必要としないフィールドまたは関係が含まれている場合は、スキーマから省略する
  - 一部のクライアントが使用している既存のフィールドを削除するよりも、スキーマに新しいフィールドを追加する方が簡単かつ安全であるため
    - https://www.apollographql.com/docs/apollo-server/schema/schema/#query-driven-schema-design

## Mutationの設計

- すべてのミューテーションのレスポンスに、ミューテーションが変更したデータを含めること
  - https://www.apollographql.com/docs/apollo-server/schema/schema/#designing-mutations

- データ更新時は共通で「MutationResponse」を実装したResponseTypeを全ての更新Mutationごとに定義すること
  - https://www.apollographql.com/docs/apollo-server/schema/schema/#structuring-mutation-responses

## searchとunionについて

```
query {
  search(contains: "Rowling") {
    ... on Book {
      title
    }
    ... on Author {
      name
    }
  }
}
```

contains引数に渡された文字列で曖昧検索を行った結果、「book」がHITすればschemaはResult Unionのresolverの中でbookスキーマとして返されるし、
「author」がHITすればauthorスキーマで返すような仕組みになっている。

