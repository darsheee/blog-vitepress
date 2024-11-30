# Django REST Framework

## 介绍

Django REST Framework 是一个用于构建 Web API 的强大框架。

它建立在 Django 之上，提供了构建 RESTful API 所需的所有工具。

## 安装

```bash
pip install djangorestframework
```

## 创建项目

```bash
django-admin startproject <project_name>
```

## 项目结构

```
<project_name>/                   # 项目根目录
    manage.py                     # Django 的命令行工具，用于管理项目
    <project_name>/              # 项目配置目录
        __init__.py              # 将目录标记为 Python 包
        settings.py              # 项目的全局配置文件
        urls.py                  # 项目的 URL 配置文件（路由）
        wsgi.py                  # WSGI 应用程序入口点，用于部署
        asgi.py                  # ASGI 应用程序入口点，用于异步部署（Django 3.0+）
```

## 基础配置

首先在 `settings.py` 中添加 REST framework：

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
]
```

添加 `ALLOWED_HOSTS`：

```python
ALLOWED_HOSTS = [
    'yourdomain.com',
]
```

## CORS 配置

安装 CORS 中间件：

```bash
pip install django-cors-headers
```

然后在 `settings.py` 中添加配置：

```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  # 需要放在最前面
    'django.middleware.common.CommonMiddleware',
    ...
]

# 允许所有源的跨域请求
CORS_ALLOW_ALL_ORIGINS = True

# 或者指定允许的源
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',  # 允许本地开发服务器
    # 添加其他允许的源
]
```

**以下以 `yiyan` 为例**

> 这是可以随机获取一句话的 API 接口

## 创建应用

```bash
python manage.py startapp api
```

创建模型后，需要进行数据库迁移：

```bash
# 创建迁移文件
python manage.py makemigrations

# 应用迁移
python manage.py migrate
```

## 注册应用

在 `settings.py` 中注册应用：

```python
INSTALLED_APPS = [
    ...
    'api',
]
```

## 创建模型

在 `api/models.py` 中创建模型：

```python
from django.db import models

class Sentence(models.Model):
    # 存储句子的主要内容，使用 TextField 支持长文本
    content = models.TextField(verbose_name='句子内容')
    # 作者字段，最大长度100，允许为空
    author = models.CharField(max_length=100, blank=True, verbose_name='作者')
    # 自动记录创建时间
    created_at = models.DateTimeField(auto_now_add=True)
    # 自动记录更新时间
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '句子'
        verbose_name_plural = '句子'  # 复数形式的显示名称

    def __str__(self):
        return self.content[:50]  # 返回前50个字符作为对象的字符串表示
```

## 创建序列化器

在 `api/serializers.py` 中创建序列化器：

```python
from rest_framework import serializers
from .models import Sentence

class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence  # 指定要序列化的模型
        # 指定要序列化的字段
        fields = ['id', 'content', 'author', 'created_at', 'updated_at']
```

## 创建视图

在 `api/views.py` 中创建视图：

```python
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Sentence
from .serializers import SentenceSerializer
import random

# 提供完整的 CRUD 操作
class SentenceViewSet(viewsets.ModelViewSet):
    queryset = Sentence.objects.all()  # 获取所有句子
    serializer_class = SentenceSerializer  # 指定序列化器

# 自定义随机获取一句话的 API
@api_view(['GET'])
def random_sentence(request):
    # 获取数据库中句子的总数
    count = Sentence.objects.count()
    if count == 0:
        # 如果没有数据，返回404错误
        return Response({'error': 'No sentences found'}, status=status.HTTP_404_NOT_FOUND)

    # 随机选择一个索引
    random_index = random.randint(0, count - 1)
    # 获取随机句子
    sentence = Sentence.objects.all()[random_index]
    # 序列化数据并返回
    serializer = SentenceSerializer(sentence)
    return Response(serializer.data)
```

## admin 配置

在 `api/admin.py` 中注册模型：

```python
from django.contrib import admin
from .models import Sentence

@admin.register(Sentence)
class SentenceAdmin(admin.ModelAdmin):
    # 在列表页显示的字段
    list_display = ('id', 'content', 'author', 'created_at', 'updated_at')
    # 可点击进入详情页的字段
    list_display_links = ('id', 'content')
    # 可搜索的字段
    search_fields = ('content', 'author')
    # 过滤器字段
    list_filter = ('created_at', 'updated_at')
    # 只读字段，不可修改
    readonly_fields = ('created_at', 'updated_at')
```

## 创建管理员账户

```bash
python manage.py createsuperuser
```

## 配置 URL

在 `urls.py` 中配置路由：

```python
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import SentenceViewSet, random_sentence

# 创建路由器实例
router = DefaultRouter()
# 注册视图集，自动生成 CRUD 路由
router.register(r'sentences', SentenceViewSet)

urlpatterns = [
    # Django admin 路由
    path('yiyan/admin/', admin.site.urls),
    # DRF 自动生成的 API 路由
    path('yiyan/', include(router.urls)),
    # 自定义的随机句子 API 路由
    path('yiyan/get/', random_sentence, name='random-sentence'),
]
```

## API 文档

DRF 提供了内置的 API 文档界面，访问 `/yiyan/` 即可查看。

## 测试 API

### 使用 curl 测试 API

```bash
# 获取句子列表
curl -X GET http://localhost:8000/yiyan/sentences/

# 创建新句子
curl -X POST http://localhost:8000/yiyan/sentences/ \
    -H "Content-Type: application/json" \
    -d '{"content":"Django入门","author":"张三"}'

# 获取特定句子
curl -X GET http://localhost:8000/yiyan/sentences/1/

# 更新句子
curl -X PUT http://localhost:8000/yiyan/sentences/1/ \
    -H "Content-Type: application/json" \
    -d '{"content":"更新后的内容","author":"张三"}'

# 删除句子
curl -X DELETE http://localhost:8000/yiyan/sentences/1/

# 获取随机句子
curl -X GET http://localhost:8000/yiyan/get/
```

### 使用 Django Admin 测试 API

访问 `/yiyan/admin/` 即可看到 Django Admin 界面，并进行测试

## 最佳实践

1. 使用适当的 HTTP 方法（GET, POST, PUT, DELETE）
2. 实现适当的错误处理
3. 使用版本控制
4. 添加适当的文档
5. 实现缓存机制
6. 使用适当的状态码

## 进阶主题

- 自定义认证
- 自定义权限
- 自定义序列化器
- 视图集和路由器
- 过滤和搜索
- 节流控制
