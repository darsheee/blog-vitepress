# Nginx 教程

## 安装 Nginx

```bash
sudo apt update
sudo apt install nginx
```

## 配置 Nginx

Nginx 的配置文件一般位于`/etc/nginx/`

其中`nginx.conf`是主配置文件（不管它）

`sites-available`中的文件是虚拟主机配置文件，`sites-enabled`中的文件是软链接

首先在`sites-available`中创建一个文件，例如`site.yourdomain.com`来配置你的虚拟主机

```bash
sudo vi /etc/nginx/sites-available/site.yourdomain.com
```

以下给出两个`sites-available`的示例：

### 直接转发某个前端项目（以 vue 为例）

> vue 项目打包后会生成一个`dist`文件夹，里面包含打包后的文件
>
> 详细请查看 vue 教程（还没写呢）

所以我们只需要配置 nginx 将`root`指向`dist`文件夹，然后`index`指向`index.html`即可

> 有关 ssl 证书(https)的配置请查看[ssl 证书教程](./ssl.md)

```nginx
server {
    listen 80;
    server_name site.yourdomain.com www.site.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name site.yourdomain.com www.site.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /path/to/your/dist;
    index index.html;

    location / {
    	try_files $uri $uri/ /index.html;
    }
}
```

只需要修改 `root` 、 `index` 和 `server_name` 即可

### 转发某个端口到 80

例如你有一个项目跑在 3000 端口，你可以通过配置 nginx 将 3000 端口转发到 80 端口

```nginx
server {
    listen 80;
    server_name site.yourdomain.com www.site.yourdomain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name site.yourdomain.com www.site.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

只需要修改 `proxy_pass` 和 `server_name` 即可

## 启用配置文件

```bash
sudo ln -s /etc/nginx/sites-available/site.yourdomain.com /etc/nginx/sites-enabled/site.yourdomain.com
```

这意味着 nginx 会启用`site.yourdomain.com`这个配置文件

## 测试配置

其实我一般不测试，报错就说明有问题（

```bash
sudo nginx -t
```

如果显示`syntax is ok`，则表示配置无误

如果报错了，可以使用`sudo systemctl status nginx`查看错误信息

## 重启 Nginx

```bash
sudo systemctl restart nginx
```

此时你就可以通过域名访问你的项目了
