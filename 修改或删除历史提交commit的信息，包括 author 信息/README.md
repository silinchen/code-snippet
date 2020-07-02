# 修改或删除历史提交commit的信息，包括 author 信息

## 修改历史提交的 Author 信息

### 使用 git rebase 进行修改或删除

#### 用法
```
git rebase -i HEAD~n
// 或
git rebase -i (commit-id)
```
> -i 表示用交互式打开
> HEAD~n 表示最近的n 条，例如最近3条：git rebase -i HEAD~3
> commit-id 是指定某一条 commit id，会显示指定的 id 之后的 commit 信息

使用上面命令 `git rebase -i HEAD~3`，打开编辑器并且显示最近 3 条 commit 记录，后面跟着命令说明

```
pick d6c0924 update1 test.txt
pick 4119460 update2 test.txt
pick 2b19f2a update3 test.txt

# Rebase fe98dbf..2b19f2a onto fe98dbf (3 command(s))
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
```

> 前 3 行就是最近的 3 次 commit 的记录，一行的内容分 3 部分。
> 以第一行为例：第一部分是命令 `pick`，可以看作是标识 commit 的状态，第二部分 `d6c0924`，是 commit id 的简写，第三部分 `update1 test.txt` 是 commit 提交时填写的备注信息。
> 后面的内容主要是一些说明信息，接下来会用到其中2个

#### 修改 author 信息
```
// 修改使用的是下面这个命令
# e, edit = use commit, but stop for amending
```

将要修改的那条 commit 记录的 `pick` 改为 `e` 或 `edit`，`e`是简写，然后保存。保存后会出现下面的信息，提示你接下来的操作。
```
Stopped at d6c09247ce8bd815b56ee77a319f3728bc5145ac... update1 test.txt
You can amend the commit now, with

        git commit --amend

Once you are satisfied with your changes, run

        git rebase --continue
```

这里的意思是说，你可以使用 git commit --amend 来修改此次提交，修改以后，觉得满意了，执行 git rebase --continue 继续剩下的流程。

由于我们的主要目的是修改提交者的信息，因此光用 `git commit --amend` 是不够的，我们要使用 `git commit --amend --author "silinchen <silinccc@gmail.com>"` 这样的操作，这一点是修改提交者信息的关键所在。

使用上面的命令成功修改此次提交的提交者信息后，一定要记得执行 git rebase --continue 继续。

如果修改了多条记录，则每次 git rebase --continue 后，会提示下一条操作的信息。
同样使用 `git commit --amend --author "silinchen <silinccc@gmail.com>"` 修改对应信息，然后继续 `git rebase --continue`

直到出现下面提示，说明修改完毕。
```
Successfully rebased and updated refs/heads/master.
```

#### 删除某条 commit
```
// 修改使用的是下面这个命令
# d, drop = remove commit
```
将要修改的那条 commit 记录的 `pick` 改为 `d` 或 `drop`，`d`是简写，然后保存。

#### 推送到远程仓库
上述修改/删除操作完成后，可以使用 `git log` 查看修改后的结果。
如果要推送到远程仓库，需要使用下面命令，强制推送。
```
git push origin master –force
```

