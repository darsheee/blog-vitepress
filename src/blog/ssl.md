# ssl 证书配置教程

## 安装 certbot

```bash
sudo apt install certbot python3-certbot-nginx
```

## 使用 certbot 获取 ssl 证书

```bash
sudo certbot --nginx -d yourdomain.com -d *.yourdomain.com
```

随后它会提示你输入邮箱并添加 dns 验证，验证成功后即可生成证书，按照提示操作即可

这意味着你将获取适用于`yourdomain.com`和`*.yourdomain.com`的 ssl 证书（由 Let's Encrypt 提供）

其中`*.yourdomain.com`表示所有**二级子域名**，例如`blog.yourdomain.com`、`abc.yourdomain.com`等

> **但是`*.yourdomain.com`不包括`abc.def.yourdomain.com`等三级域名的 ssl 证书，并且没有办法通过通配符的方式批量获取，只能单独申请，所以我一般不建议使用三级域名**

## 证书保存位置

证书默认保存在`/etc/letsencrypt/live/yourdomain.com`目录下

其中`fullchain.pem`是证书文件，`privkey.pem`是密钥文件

## 设置自动续期

Let’s Encrypt 的证书有效期为 90 天。Certbot 会自动安装一个定时任务，以每天检查并续期证书。你可以手动测试续期是否工作正常：

```bash
sudo certbot renew --dry-run
```

> 随后去 nginx 配置文件中添加证书即可，请查看[nginx 教程](./nginx.md)
