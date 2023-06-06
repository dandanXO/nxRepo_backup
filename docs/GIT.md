Git 調整一下版本控制 Flow:

# (Everyone) 開發功能、測試機功能部署

1. (every one) 新功能 feature branch/ 大範圍問題清單的QA Issues
   收到 jira 新功能需求，並創建新分支，並將 jira 更改狀態為 in progress:
   1.1.基本上:從 master branch 創建新分支 feature/frontend-XXX。
   Note: 此新分支只能 merge 穩定版本的 master branch。
   1.2. 新 featureB branch 依賴尚未合併到 master 的 featureB branch。
   請基於 尚未合併到 master 的 featureA branch  新開一條，featureB branch。

2.  (every one) (optional) 測試機單獨測試 feature branch
    feature/frontend-XXX 完成後，可以使用 jenkins 去針對單獨 branch 去做測試機的部署，先讓測試人員進行測試。
    Note: 測試時請注意測試機目前的branch，避免覆蓋。

3. (every one) 測試機測試 dev branch
   使用 gitlab 去提交 feature/frontend-XXX  的 merge request 。
   Note: Assignee 要指派人。不需要 delete branch。

主要針對代碼品質去做 code review 的反饋，反饋修正後會合併回 dev。
並部署 jenkins 去針對 dev branch 的在測試機環境下進行測試。
Note: 並將 jira 更改狀態為 testing，變更指派人為 後台(Joan), App(Lewis)。


