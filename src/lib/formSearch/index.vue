<template>
    <div class="form">
        <div class="form_item" v-for="item in optsList" :key="item.key">
            <template v-if="item.type === 'input'">
                <div class="form_item_lable">{{ item.label }}</div>
                <div class="form_item_val">
                    <el-input
                        v-model="formData[item.key]"
                        placeholder="请输入姓名"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :size="item.size || 'default'"
                        clearable
                    ></el-input>
                </div>
            </template>
            <template v-if="item.type === 'select'">
                <div class="form_item_lable">{{ item.label }}</div>
                <div class="form_item_val">
                    <el-select
                        v-model="formData[item.key]"
                        :multiple="item.multiple"
                        :filterable="!!item.filterable"
                        :clearable="!!item.clearable"
                        style="width: 100%"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :size="item.size || 'default'"
                    >
                        <el-option
                            v-for="el in item.selects"
                            :key="el.id"
                            :label="el.name"
                            :value="el.id"
                        />
                    </el-select>
                </div>
            </template>
            <template v-if="item.type === 'date'">
                <div class="form_item_lable">{{ item.label }}</div>
                <div class="form_item_val">
                    <el-date-picker
                        v-model="formData[item.key]"
                        style="width: 100%"
                        :type="item.dateType"
                        :size="item.size || 'default'"
                        :format="item.format || 'YYYY'"
                        :value-format="item.format || 'YYYY'"
                        :placeholder="item.placeholder"
                        @change="change(item.key)"
                    />
                </div>
            </template>
            <template v-if="item.type === 'remoteSelect'">
                <div class="form_item_lable">{{ item.label }}</div>
                <div class="form_item_val">
                    <el-select
                        v-model="formData[item.key]"
                        multiple
                        :filterable="!!item.filterable"
                        style="width: 100%"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :clearable="!!item.clearable"
                        :remote="!!item.remote"
                        :size="item.size || 'default'"
                    >
                        <el-option
                            v-for="el in item.selects"
                            :key="el.id"
                            :label="el.name"
                            :value="el.id"
                        />
                    </el-select>
                </div>
            </template>
            <template v-if="item.type === 'daterange'">
                <div class="form_item_lable">{{ item.label }}</div>
                <div class="form_item_val">
                    <el-config-provider :locale="locale">
                        <el-date-picker
                            style="width: 94%"
                            v-model="formData[item.key]"
                            type="monthrange"
                            :size="item.size || 'default'"
                            :value-format="item.format || 'YYYY'"
                            :format="item.format || 'YYYY'"
                            range-separator="~"
                            :start-placeholder="
                                item.starPlaceholder
                                    ? item.starPlaceholder
                                    : '开始日期'
                            "
                            :end-placeholder="
                                item.endPlaceholder
                                    ? item.endPlaceholder
                                    : '结束日期'
                            "
                            @change="change(item.key, item.key2 || '')"
                        />
                    </el-config-provider>
                </div>
            </template>
            <template v-if="item.type === 'slot'">
                <slot v-if="item.name" :name="item.name"></slot>
                <slot v-else></slot>
            </template>
        </div>
        <div class="form_item" v-if="props.searchBtn">
            <el-button @click="search" type="primary">查询</el-button>
            <el-button @click="reset" type="info">重置</el-button>
        </div>
    </div>
</template>
<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
const locale = ref(zhCn);
const props = defineProps({
    opts: {
        type: Array,
        default: () => [],
    },
    span: {
        type: Number,
        default: 6,
    },
    searchBtn: {
        type: Boolean,
        default: true,
    },
});
const formSearch = defineEmits(['formSearch']);
let formData = reactive({});
const copyForm = reactive({});
const resetForm = reactive({});
const optsList = computed(() => {
    return props.opts;
});
const search = () => {
    const search = { ...formData, ...copyForm };
    formSearch('formSearch', search);
};
const reset = () => {
    for (const key in formData) {
        formData[key] = '';
    }
    formSearch('formSearch', {});
};
const change = (key, key2) => {
    const val = formData[key];
    if (key2) {
        copyForm[key] = val[0];
        copyForm[key2] = val[1];
    }
};
defineExpose({
    formData,
    search,
    reset,
});
</script>
<style lang="scss">
.form {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
}
.form_item {
    width: 23%;
    margin: 5px 15px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.form_item_lable {
    line-height: 32px;
    text-align: left;
    display: block;
    color: #606266;
    vertical-align: middle;
    font-weight: 700;
    font-size: 12px;
    min-width: 50px;
}
.form_item_val {
    flex: 1;
    margin-left: 10px;
    /* max-width: 100%; */
}
</style>
