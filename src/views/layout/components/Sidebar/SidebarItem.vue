<template>
	<div class="menu-wrapper">
		<template v-for="item in routes" v-if="!item.hidden&&item.children">
      <div>{{item.children}}</div>
      <div>{{hasOneShowingChildren(item.children)}}</div>
			<router-link v-if="hasOneShowingChildren(item.children) " :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
				<el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}">
					<svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
					<span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title">{{item.children[0].meta.title}}</span>
				</el-menu-item>
			</router-link>

			<el-submenu v-else :index="item.name||item.path" :key="item.name">
				<template slot="title">
					<svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
					<span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
				</template>

				<template v-for="child in item.children" v-if="!child.hidden">
					<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

					<router-link v-else :to="item.path+'/'+child.path" :key="child.name">
						<el-menu-item :index="item.path+'/'+child.path">
							<svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
							<span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
						</el-menu-item>
					</router-link>
				</template>
			</el-submenu>

		</template>
	</div>
</template>

<script>
	import Layout from "../../Layout.vue"
	export default {
		name: 'SidebarItem',
		data() {
			return {

//				routes: [
//					{
//						path: '/pms',
//						component: Layout,
//						redirect: '/pms/product',
//						name: 'pms',
//						meta: {
//							title: '商品',
//							icon: 'product'
//						},
//						children: [{
//								path: 'product',
//								name: 'product',
//								component: () =>
//									import('@/views/pms/product/index'),
//								meta: {
//									title: '商品列表',
//									icon: 'product-list'
//								}
//							},
//							{
//								path: 'addProduct',
//								name: 'addProduct',
//								component: () =>
//									import('@/views/pms/product/add'),
//								meta: {
//									title: '添加商品',
//									icon: 'product-add'
//								}
//							},
//							{
//								path: 'updateProduct',
//								name: 'updateProduct',
//								component: () =>
//									import('@/views/pms/product/update'),
//								meta: {
//									title: '修改商品',
//									icon: 'product-add'
//								},
//								hidden: true
//							},
//							{
//								path: 'productCate',
//								name: 'productCate',
//								component: () =>
//									import('@/views/pms/productCate/index'),
//								meta: {
//									title: '商品分类',
//									icon: 'product-cate'
//								}
//							},
//							{
//								path: 'addProductCate',
//								name: 'addProductCate',
//								component: () =>
//									import('@/views/pms/productCate/add'),
//								meta: {
//									title: '添加商品分类'
//								},
//								hidden: true
//							},
//							{
//								path: 'updateProductCate',
//								name: 'updateProductCate',
//								component: () =>
//									import('@/views/pms/productCate/update'),
//								meta: {
//									title: '修改商品分类'
//								},
//								hidden: true
//							},
//							{
//								path: 'productAttr',
//								name: 'productAttr',
//								component: () =>
//									import('@/views/pms/productAttr/index'),
//								meta: {
//									title: '商品类型',
//									icon: 'product-attr'
//								}
//							},
//							{
//								path: 'productAttrList',
//								name: 'productAttrList',
//								component: () =>
//									import('@/views/pms/productAttr/productAttrList'),
//								meta: {
//									title: '商品属性列表'
//								},
//								hidden: true
//							},
//							{
//								path: 'addProductAttr',
//								name: 'addProductAttr',
//								component: () =>
//									import('@/views/pms/productAttr/addProductAttr'),
//								meta: {
//									title: '添加商品属性'
//								},
//								hidden: true
//							},
//							{
//								path: 'updateProductAttr',
//								name: 'updateProductAttr',
//								component: () =>
//									import('@/views/pms/productAttr/updateProductAttr'),
//								meta: {
//									title: '修改商品属性'
//								},
//								hidden: true
//							},
//							{
//								path: 'brand',
//								name: 'brand',
//								component: () =>
//									import('@/views/pms/brand/index'),
//								meta: {
//									title: '品牌管理',
//									icon: 'product-brand'
//								}
//							},
//							{
//								path: 'addBrand',
//								name: 'addBrand',
//								component: () =>
//									import('@/views/pms/brand/add'),
//								meta: {
//									title: '添加品牌'
//								},
//								hidden: true
//							},
//							{
//								path: 'updateBrand',
//								name: 'updateBrand',
//								component: () =>
//									import('@/views/pms/brand/update'),
//								meta: {
//									title: '编辑品牌'
//								},
//								hidden: true
//							}
//						]
//
//				}]

			}

	},
	props: {
			routes: {
				type: Array
			},
			isNest: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			hasOneShowingChildren(children) {
				const showingChildren = children.filter(item => {
					return !item.hidden
				})
				if(showingChildren.length === 1) {
					return true
				}
				return false
			}
		}
	}
</script>
