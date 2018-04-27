<template>
	<div class="inner main">
		<el-container>
			<el-header>
				<div class="title">中云智慧工时统计系统</div>
				<ul>
					<li>
						<i class="icon-my"></i>
						<span>{{userInfo.realname}}</span>
					</li>
					<li>
						<i class="icon-password"></i>
						<span>修改密码</span>
					</li>
					<li @click="logout">
						<i class="icon-logout"></i>
						<span>退出</span>
					</li>
				</ul>
			</el-header>
			<el-container>
				<el-aside>
						<el-menu
							class="el-menu-vertical-demo"
							text-color="#fff"
							:default-active="vm.currentMenu"
							:collapse="vm.isCollapse"
							:unique-opened="true"
						>
								<el-submenu @click.native="vm.isCollapse = !vm.isCollapse" index="0" class="action-menu">
										<template slot="title">
											<span slot="title">功能菜单</span>
											<i class="pack icon-pack-left" :class="{'pack-active':vm.isCollapse}"></i>
										</template>
								</el-submenu>
								<el-submenu :index="'' + item.id" :key="item.id" v-for="item in menus">
										<template slot="title">
												<i :class="item.className"></i>
												<span slot="title">{{item.name}}</span>
										</template>
										<el-menu-item @click="handleGoTo(item,child)" v-for="child in item.second"  :key="child.id" :index="'' + child.id">
											<!-- <router-link tag="div" :to="{path:child.linkUrl,params:{menuId:child.id}}">{{child.name}}</router-link> -->
											{{child.name}}
										</el-menu-item>
								</el-submenu>
						</el-menu>
				</el-aside>
				<el-main>
						<el-breadcrumb separator-class="el-icon-arrow-right">
							<el-breadcrumb-item><!-- <i class="icon-breadcrumb"></i> -->{{breadcrumb.parent}}</el-breadcrumb-item>
							<el-breadcrumb-item>{{breadcrumb.child}}</el-breadcrumb-item>
						</el-breadcrumb>
					<router-view class="router-main" />
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<style scoped lang="less">
	@import "../../assets/less/modules/main.less";
</style>
<script>
	import { mapState, mapMutations } from "vuex";
	import {Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem} from "element-ui";
	export default {
		name: "mains",
		computed: {
			...mapState({
				userInfo: state => state.main.userInfo,
				menus: state => state.main.menus,
				vm: state => state.main.vm,
				breadcrumb: state => state.main.breadcrumb,
			})
		},
		components: {
			"el-menu":Menu,
			"el-submenu":Submenu,
			"el-menu-item":MenuItem,
			"el-breadcrumb":Breadcrumb,
			"el-breadcrumb-item":BreadcrumbItem,
		},
		created(){
			this.getMenus(menuId => {
				this.$router.push("/main/day/" + menuId);
			});
		},
		methods: {
			...mapMutations({
				getMenus:"main/getMenus"
			}),
			logout() {
				sessionStorage.userId = "";
				this.$MessageBox.confirm('确定要退出系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: "/" });
        }).catch(() => {
                   
        });
			},
			handleGoTo(item,child){
				this.breadcrumb.parent = item.name;
				this.breadcrumb.child = child.name;
				this.$router.push(child.linkUrl + "/" + child.id);
			}
		}
	}
</script>