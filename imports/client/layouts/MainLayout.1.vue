<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark" active-name="home" @on-select="handleMenuSelect">
            <div class="layout-logo"></div>
            <div class="layout-nav">
                <MenuItem name="home">
                <Icon type="ios-navigate"></Icon>
                Home
                </MenuItem>
                <MenuItem name="post">
                <Icon type="ios-navigate"></Icon>
                Posts
                </MenuItem>
                <Submenu name="item">
                    <template slot="title">
                        <Icon type="stats-bars"></Icon>
                        Product/Service
                    </template>
                    <MenuItem name="unit">Unit</MenuItem>
                    <MenuItem name="category">Category</MenuItem>
                    <MenuItem name="item">Item</MenuItem>
                </Submenu>

                <!-- User Profile  -->
                <div class="layout-nav-right">
                    <span>
                        <Select v-model="branch" placeholder="Branches..." style="width: 200px; margin-right: 20px;">
                            <Option lable="BTB" value="BTB">
                            </Option>
                        </Select>
                    </span>

                    <Dropdown placement="bottom-end" @on-click="handleDropdown">
                        <a href="javascript:void(0)">
                            <Icon type="person"></Icon>
                            {{userFullName}}
                        </a>
                        <DropdownMenu slot="list">
                            <Dropdown-item name="profile">Profile</Dropdown-item>
                            <Dropdown-item name="logout" divided>Logout</Dropdown-item>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </Menu>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Project</BreadcrumbItem>
                <BreadcrumbItem>iView</BreadcrumbItem>
            </Breadcrumb>
        </div>

        <!-- route outlet -->
        <router-view></router-view>

        <div class="layout-copy">
            2014-{{currentYear}} &copy; Rabbit Technology
        </div>

        <BackTop :height="60"></BackTop>
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

export default {
    name: 'MainLayout',
    data() {
        return {
            currentYear: moment().format('YYYY'),
            branch: '',
            userFullName: 'Theara'
        };
    },
    computed: {
    },
    methods: {
        handleBranchChange(val) {
            console.log(val);
        },
        handleMenuSelect(name) {
            this.$router.push({ name });
        },
        handleDropdown(name) {
            this[name]();
        },
        profile(name) {
            this.$Message.info('Prfile is clicked');
        },
        logout() {
            Meteor.logout(() => {
                this.$Message.success('You are logout!');
                this.$router.push({ name: 'login' })
            });
        },
    },
};
</script>

<style lang="scss">
.layout {
    /* border: 1px solid #d7dde4; */
    border: 0px solid #d7dde4;
    background: #f5f7f9;
}

.layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 30px;
    margin-right: 20px;
}

.layout-nav {
    /* width: 100%; */
    margin: 0 auto;
}

.layout-nav-right {
    float: right;
    margin-right: 30px;
}

.layout-assistant {
    width: 300px;
    margin: 0 auto;
    height: inherit;
}

.layout-breadcrumb {
    padding: 10px 30px 0;
}

.layout-content {
    /* min-height: 200px; */
    min-height: calc(100vh - 170px);
    /* margin: 10px 70px; With breadcrumbs */
    margin: 15px 30px;
    overflow: hidden;
    background: #fff;
    /* border-radius: 4px; */
    /* padding: 20px 30px 0px 30px; */
}

.layout-page-header {
    /* border-bottom: 1px solid #e9eaec; */
    margin-bottom: 15px;
}

.layout-copy {
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
</style>
