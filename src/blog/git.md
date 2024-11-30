# git 教程

## 一些声明

身为一个现代人，强烈建议你使用如 vscode 自带的 git 管理工具

当然你理应对 git 有基本的了解

## 安装 git

```bash
sudo apt update
sudo apt install git

git --version
```

安装成功将会输出 git 版本号

## git 换源（可选）

请注意，示例提供的方法无法使用`git push`,**只建议在云服务器上使用**

国内使用 git 时常发生抽风的现象

全局更改镜像网站下载可大大方便后续操作

```bash
git config --global url."https://ghproxy.cc/https://github.com/".insteadOf "https://github.com/"
```

使用全局参数更改后 使用 `vi ~/.gitconfig` 命令即可查看当前的配置文件，看到以下配置：

```bash
[url "https://ghproxy.cc/https://github.com/"]
        insteadOf = https://github.com/
```

即配置成功

## 本地连接 GitHub 的 SSH 密钥

### 生成 SSH 密钥

如果你本地没有生成过 ssh 密钥，在终端执行以下命令：

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

按照提示操作，通常直接按回车即可使用默认路径和文件名

### 启动 SSH 代理

如果你用的是 linux 或 macOS，可在终端执行以下命令：

```bash
eval "$(ssh-agent -s)"
```

**理论上这不是必须的**

### 添加 SSH 密钥到 SSH 代理

运行以下命令，将生成的 SSH 密钥添加到代理中：

```bash
ssh-add ~/.ssh/id_rsa
```

### 将公钥添加到 GitHub

复制公钥内容到剪贴板：

```bash
cat ~/.ssh/id_rsa.pub
```

然后登录 GitHub，进入 **Settings** > **SSH and GPG keys**，点击 **New SSH key**，将复制的公钥粘贴到对应的框中，填写一个标题（随意），然后保存

### 连接测试

运行以下命令测试连接是否成功：

```bash
ssh -T git@github.com
```

如果一切正常，你应该会看到一条欢迎信息。

### 在受限网络环境下使用 SSH

如你所处环境无法使用 22 端口

可以配置`~/.ssh/config`文件

```bash
Host github.com
    HostName ssh.github.com
    User git
    Port 443
```

## 将本地文件上传到 GitHub

git 的原理是，你的本地拥有一个本地仓库，GitHub 上的仓库称为远程仓库

请注意：**本地仓库不等于本地文件夹**

我们之后的操作，都基于 修改本地仓库 -> 将本地仓库上传到远程仓库 以完成同步

你在**本地文件夹**创建的文件、删除的文件，都需要上传至**本地仓库**才能完成同步，单单修改文件夹是没有用的

### 创建一个 GitHub 仓库

- 登录你的 GitHub 账号。

- 点击右上角的 “+” 按钮，选择 “New repository”。

- 填写仓库名称和描述，选择是否公开或私有，然后点击 “Create repository”。

### 在本地初始化 Git 仓库

打开终端或命令提示符，进入你想上传的文件夹，运行以下命令：

```bash
git init
```

此命令相当于你创建了一个本地仓库

### 为本地仓库添加文件

首先，我们一般会忽略本地的一些文件例如`node_modules`

在项目根目录下创建`.gitignore`文件，并添加以下内容

```bash
node_modules/
```

这会告诉 git 忽略 `node_modules` 文件夹中的所有文件。

同理还有`.vscode`里的大部分等等

可以使用`!`来排除某些文件被忽略，例如：

```bash
.vscode/*
!.vscode/extensions.json
```

这意味着，git 会忽略`.vscode`文件夹中除了`extensions.json`之外的所有文件。

将你要上传的文件添加到 git 暂存区：

```bash
git add .
```

`.`表示添加当前目录下的所有文件，你也可以指定某个文件名

例如：`git add README.md` 代表只上传 README.md 文件（覆盖）

### 提交更改

提交你添加的文件：

```bash
git commit -m "1.0.0"
```

此处`1.0.0`将会是你在 GitHub 上看到的版本备注

### 关联远程仓库

将本地仓库与 GitHub 仓库关联：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
```

与远程仓库关联后，可以使用`git remote -v`查看当前关联的远程仓库

与远程仓库断开连接：

```bash
git remote remove origin
```

### 将本地仓库推送到 GitHub

请注意你的 GitHub 仓库用的 branch 是**main**还是**master**

```bash
git push -u origin main
```

如果使用的是 `master` 分支，命令为 `git push -u origin master`

完成后，你的文件就会出现在 GitHub 的仓库中。

## 在本地仓库删除部分文件

### 预览将要删除的文件

```bash
git rm -r -n --cached 文件/文件夹名称
```

加上 `-n` 这个参数，执行命令时，是不会删除任何文件，只是展示此命令要删除的文件列表预览

### 确认无误后删除文件

此操作不会删除本地的文件或文件夹

```bash
git rm -r --cached 文件/文件夹名称
```

之后正常`commit && push`即可

### 直接删除本地仓库和远程仓库所有文件以及提交记录

请注意：非常不建议执行此操作，除非你已经想好了

```bash
git checkout --orphan temp
git add .
git commit -m "reforged"
git branch -D main
git branch -m main
git push -f origin main
```

执行逻辑是：创建一个临时分支->添加所有文件到这个分支->删除`main`分支->更改临时分支为`main`->强制推送到远程仓库

注意：有些仓库有 main 分支保护，不允许强制 push，需要在远程仓库项目里暂时把项目保护关掉才能推送。

## 更新本地仓库

### 在云服务器上拉取 GitHub 仓库

```bash
git clone https://github.com/用户名/仓库名.git
```

![链接来源](https://image.honahec.cc/git-clone.png)

> 一般建议使用 SSH 连接（需要配置 SSH 密钥）

### 从远程仓库更新本地仓库

```bash
git pull
```
