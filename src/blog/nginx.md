# Nginx教程

## 安装Nginx

```bash
sudo apt update
sudo apt install nginx
```

## 配置Nginx

Nginx的配置文件一般位于`/etc/nginx/`

其中`nginx.conf`是主配置文件（不管它）

`sites-available`中的文件是虚拟主机配置文件，`sites-enabled`中的文件是软链接

首先在`sites-available`中创建一个文件，例如`site.yourdomain.com`来配置你的虚拟主机

```bash
sudo vi /etc/nginx/sites-available/site.yourdomain.com
```

以下给出两个`sites-available`的示例：

### 直接转发某个前端项目（以vue为例）

> vue项目打包后会生成一个`dist`文件夹，里面包含打包后的文件
>
> 详细请查看vue教程（还没写呢）

所以我们只需要配置nginx将`root`指向`dist`文件夹，然后`index`指向`index.html`即可

> 有关ssl证书(https)的配置请查看[ssl证书教程](./ssl.md)

```nginx
server {
    listen 80; // 监听80端口（http）
    server_name site.yourdomain.com www.site.yourdomain.com; // 服务器名（即你想使用的域名，可以多个）
    return 301 https://$host$request_uri; // 301重定向到https
}

server {
    listen 443 ssl; // 监听443端口（https）
    server_name site.yourdomain.com www.site.yourdomain.com; // 服务器名（即你想使用的域名，可以多个）

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem; // 证书（查看ssl证书教程配置）
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem; // 证书密钥
    ssl_protocols TLSv1.2 TLSv1.3; // 支持的SSL协议（无需修改）
    ssl_ciphers HIGH:!aNULL:!MD5; // 加密套件（无需修改）

    root /path/to/your/dist; // 根目录（文件夹路径）
    index index.html; // 默认文件

    location / {
    	try_files $uri $uri/ /index.html; // 尝试文件
    }
}
```

### 转发某个端口到80

例如你有一个项目跑在3000端口，你可以通过配置nginx将3000端口转发到80端口

```nginx
server {
    listen 80; // 监听80端口
    server_name site.yourdomain.com www.site.yourdomain.com; // 服务器名（即你想使用的域名，可以多个）
    return 301 https://$host$request_uri; // 301重定向到https
}

server {
    listen 443 ssl; // 监听443端口
    server_name site.yourdomain.com www.site.yourdomain.com; // 服务器名（即你想使用的域名，可以多个） 

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem; // 证书（查看ssl证书教程配置）
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem; // 证书密钥
    ssl_protocols TLSv1.2 TLSv1.3; // 支持的SSL协议（无需修改）
    ssl_ciphers HIGH:!aNULL:!MD5; // 加密套件（无需修改）

    location / {
        proxy_pass http://127.0.0.1:3000; // 代理地址
        proxy_http_version 1.1; // 代理版本（无需修改）
        proxy_set_header Upgrade $http_upgrade; // 设置头（无需修改）
        proxy_set_header Connection 'upgrade'; // 设置头（无需修改）
        proxy_set_header Host $host; // 设置头（无需修改）
        proxy_cache_bypass $http_upgrade; // 缓存绕过（无需修改）
    }
}
```

## 启用配置文件

```bash
sudo ln -s /etc/nginx/sites-available/site.yourdomain.com /etc/nginx/sites-enabled/site.yourdomain.com
```

这意味着nginx会启用`site.yourdomain.com`这个配置文件

## 测试配置

其实我一般不测试，报错就说明有问题（

```bash
sudo nginx -t
```

如果显示`syntax is ok`，则表示配置无误

如果报错了，可以使用`sudo systemctl status nginx`查看错误信息

## 重启Nginx

```bash
sudo systemctl restart nginx
```

此时你就可以通过域名访问你的项目了