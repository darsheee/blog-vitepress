<template>
  <div class="todo-item">
    <Icon icon="proicons:checkmark-circle" class="icon" />
    &nbsp;&nbsp;
    <slot></slot>
  </div>
  <br/>
</template>

<style scoped>
.todo-item {
  display: inline-flex;
  align-items: center;
}

.todo-item .icon {
  color: var(--vp-c-brand-1);
}
</style>
