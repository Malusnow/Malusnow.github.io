---
id: 1
title: 开源中常见的Git使用问题汇总
date: 2026-06-02
description: 总结了参与开源贡献的过程中遇到的有关Git使用的一些问题
---

# 开源中常见的Git使用问题汇总

1. 想要获取自己fork的仓库的最新合并/更新：

如果没有添加upstream需要先：

```markdown
git remote add upstream <原仓库的GitHub地址>
```

获取远程更新：

```markdown
git fetch upstream
```

---

1. 为什么克隆到本地已经有main分支，但是却还是需要自己创建一个新的分支，并在这个新的分支上工作？这几个分支和原仓库的分支的关系是什么？

- **_如果直接在你的main分支上修改会发生什么?_**

1. 你的本地main分支应该始终与原仓库（upstream）保持同步。如果你在main上写了代码，下次想同原仓库的新功能时，就会发生冲突，导致你的main变得很乱。(也就是说上次的fetch操作其实是把upstream的变更拉到了你的本地仓库的main分支，是用来同步的)
2. 如果你想同时做两个功能（比如功能 A 和修复 Bug B），在同一个main分支上写会把代码混在一起。分两个分支写，可以独立提交、独立删除。
3. 当你向原仓库提交 PR 时，原仓库的维护者可能要求你修改代码。如果代码在独立分支上，你可以继续在这个分支修改。如果你用main提交了 PR，同时又想做别的事，你的main就会被“锁死”在那个 PR 里。

- **_分支间的关系_**

有三个仓库，原仓库，fork下的仓库，本地仓库
• **`upstream/main`**：原仓库的最远端分支（你只有读权限）。
• **`origin/main`**：你云端仓库的分支（你 Fork 出来的那个）。
• **`local/main`**：你电脑上的分支，专门用来“搬运” `upstream` 的更新。
• **`local/feature-xxx` (新分支)**：你真正写代码的地方。

**标准的工作流应该是：**

1. 把 `upstream/main` 的最新代码拉到你的 `local/main`。
2. 从 `local/main` 切出一个新分支 `local/feature-1`。
3. 在 `feature-1` 上写代码并 `commit`。
4. 把 `local/feature-1` 推送到你的云端 `origin/feature-1`。
5. 在 GitHub 页面上，用你的 `origin/feature-1` 向 `upstream/main` 发起 PR。

---

1. 当维护者要求修改你的PR，同时原仓库有更新，那么在你的第二次工作当中，应当如何去处理分支的落后？

答案是**先同步主干，再rebase开发分支(你的feature-1)。**

方法一：

```markdown
//切换到本地main分支
git checkout main
//拉取上游的更新并合并到本地main
git pull upstream main
```

若出现冲突，需要打开冲突文件，手动解决冲突，确保你修改的内容不会和上游更新冲突。

但如果你创建了新分支并在新分支上工作，是不会的。（因为你的feature分支代码没有同步到main）

然后回到你的开发分支：

```markdown
git checkout feature-1
git rebase main
```

方法二：

```markdown
git checkout main
//获取更新
git fetch upstream
//合并到本地
git merge upstream/main
```

fetch更安全，让你可以查看新的更新，同时你的本地代码没有发生变化，可以确认是否会产生冲突之后，再决定要不要merge（将代码合并到本地）

变基操作同上：

```markdown
git checkout feature-1
git rebase main
```

**_但是以上做法还有一个隐患，就是会产生merge commit，所以更干净的做法是：_**

```markdown
//fetch上游的更新
git fetch upstream

//切换到你正在开发的分支
git checkout feature-1

//直接变基到upstream/main
git rebase upstream/main
```

这个变基操作其实也是相当于把上游代码拉到了本地，但是这样做不会出现merge commit。如果变基时出现冲突，先解决冲突，然后执行 `git rebase --continue`，也可以终止此次变基 `git rebase --abort` 。
