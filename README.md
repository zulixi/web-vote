# このサイトでは簡単な投票ができます。

## setup
```sh
#install
$ git clone https://github.com/zulixi/web-vote

$ cd ./web-vote


$ yarn install

$ PORT=8000 yarn start
#portを設定しない場合はdefaultの3000番になります。

```

### pages 説明
| PATH | 説明 |
| --- | --- |
| /form | 投票できます |
| /api/v1/vote | 投票結果を取得できます |
| /api/v1/counter | 投票結果を集計した情報を取得できます |

### 補足
#### 本環境
- ubuntu 18.04
- node v10.14.2
- yarn 1.12.1
