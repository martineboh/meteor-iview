<template>
    <div class="layout">

        <div class="layout-header">
            <Menu mode="horizontal" theme="dark" @on-select="handleMenuSelect">
                <div class="header-nav">
                    <div class="nav-logo"></div>
                    <div class="nav-search">
                        <Input v-model="headerSearch" size="small" placeholder="Search..." style="width: 300px"></Input>
                    </div>

                    <div class="nav-list">
                        <MenuItem name="message">
                        <Badge dot>
                            <Icon type="paper-airplane" size="20"></Icon>
                        </Badge>
                        </MenuItem>
                        <MenuItem name="action">
                        <Badge count="5" overflow-count="999">
                            <Icon type="ios-bell-outline" size="20"></Icon>
                        </Badge>
                        </MenuItem>

                        <!-- User -->
                        <Dropdown placement="bottom-end" @on-click="handleDropdown">
                            <a href="javascript:void(0)">
                                <div>
                                <Avatar style="background-color: #87d068" icon="person" />
                                </div><!-- <Icon type="person"></Icon>
                                Rabbit
                                <Icon type="arrow-down-b"></Icon> -->
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem name="_profile">Profile</DropdownItem>
                                <DropdownItem name="_logout" divided>Logout</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </Menu>
        </div>

        <div class="layout-breadcrumb">
            <Breadcrumb>
                <BreadcrumbItem v-for="(bc, index) in breadcrumbs" :key="bc.name">
                    <router-link v-if="index < (breadcrumbs.length - 1)" :to="bc.to">
                        <Icon v-if="bc.icon" :type="bc.icon"></Icon>
                        {{bc.title}}
                    </router-link>

                    <span v-else>
                        <Icon v-if="bc.icon" :type="bc.icon"></Icon>
                        {{bc.title}}
                    </span>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>

        <div class="layout-content">
            <Row>
                <Col span="4">
                <div class="content-sidebar">
                    <Menu :active-name="linkActiveClass" width="auto" @on-select="handleMenuSelect">
                        <MenuItem name="home">
                            <Icon type="home"></Icon> Home 
                        </MenuItem>
                        <MenuItem name="post">
                            <Icon type="social-facebook"></Icon> Post 
                        </MenuItem>
                        <MenuItem name="map">
                            <Icon type="social-facebook"></Icon> Map 
                        </MenuItem>
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                Item1
                            </template>
                            <MenuItem name="1-1">Subitem 1</MenuItem>
                            <MenuItem name="1-2">Subitem 2</MenuItem>
                            <MenuItem name="1-3">Subitem 3</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                Item2
                            </template>
                            <MenuItem name="2-1">Subitem 1</MenuItem>
                            <MenuItem name="2-2">Subitem 2</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                Item3
                            </template>
                            <MenuItem name="3-1">Subitem 1</MenuItem>
                            <MenuItem name="3-2">Subitem 2</MenuItem>
                        </Submenu>
                    </Menu>
                </div>
                </Col>
                <Col span="20">
                <div class="content-main">
                    <h1 class="page-title">{{pageTitle}}</h1>

                    <!-- route outlet -->
                    <router-view></router-view>
                </div>
                </Col>
            </Row>
        </div>

        <div class="layout-copy">
            {{copyright}} &copy; Rabbit Tech
        </div>

        <!-- Back Top -->
        <BackTop :height="60"></BackTop>
    </div>
</template>

<script>
import { Meteor } from 'meteor/meteor';
import _ from 'lodash';
import moment from 'moment';

export default {
  name: 'MainLayout2',
  data() {
    return {
      headerSearch: '',
      copyright: `2014-${moment().format('YYYY')}`
    };
  },
  computed: {
    linkActiveClass() {
      return this.$route.meta.linkActiveClass
        ? this.$route.meta.linkActiveClass
        : this.$route.name;
    },
    pageTitle() {
      let title = 'No TiTle';
      title = this.$route.meta.pageTitle
        ? this.$route.meta.pageTitle
        : this.$route.name ? _.startCase(this.$route.name) : title;

      return title;
    },
    breadcrumbs() {
      let crumbs = [];

      _.forEach(this.$route.matched, ({ meta, path, name }) => {
        const crumb = meta.breadcrumb;
        if (crumb) {
          // Use `name` for route
          if (name) {
            crumb.to = { name: name };
            // Check params
            if (crumb.params) {
              crumb.to.params = _.pickBy(this.$route.params, (val, key) => {
                return _.includes(crumb.params, key);
              });
            }
            // Check query
            if (crumb.query) {
              crumb.to.query = _.pickBy(this.$route.query, (val, key) => {
                return _.includes(crumb.query, key);
              });
            }
          } else {
            // Use `path` for route
            // Check path is empty
            path = path ? path : '/';
            crumb.to = path;
            // Check params
            if (crumb.params) {
              // Reduce crumb.to
              crumb.to = _.reduce(
                crumb.params,
                (result, val) => {
                  result = _.replace(
                    result ? result : path,
                    val,
                    this.$route.params[val]
                  );
                },
                ''
              );
            }
            // Check query
            if (crumb.query) {
              crumb.to.query = _.pickBy(this.$route.query, (val, key) => {
                return _.includes(crumb.query, key);
              });
            }
          }

          crumbs.push(crumb);
        }
      });

      return crumbs;
    }
  },
  methods: {
    handleMenuSelect(name) {
      this.$router.push({ name });
    },
    handleDropdown(name) {
      this[name]();
    },
    _profile() {
      this.$Message.info('Prfile is clicked');
    },
    _logout() {
      Meteor.logout(() => {
        this.$Message.success('You are logout!');
        this.$router.push({ name: 'login' });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  background: #eee;
}

.layout-header {
  .header-nav {
    width: 90%;
    margin: 0 auto;

    .nav-logo {
      width: 100px;
      height: 30px;
      background: #5b6270;
      border-radius: 3px;
      float: left;
      position: relative;
      top: 15px;
    }

    .nav-search {
      float: left;
      margin-left: 50px;
      line-height: 57px;
    }

    .nav-list {
      float: right;
    }
  }
}

.layout-breadcrumb {
  width: 90%;
  margin: 15px auto 15px;
  padding: 0px 0px;
}

.layout-content {
  background: #fff;
  width: 90%;
  margin: 0px auto 0px;
  border-radius: 4px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);

  .content-sidebar {
    padding: 15px 0;
  }

  .content-main {
    padding: 20px 25px;
    position: relative;
    min-height: calc(100vh - 154px);

    .page-title {
      font-size: 26px;
      font-weight: 400;
      margin: 0px 0px 15px;
    }
  }

  .content-main:after {
    content: '';
    display: block;
    width: 1px;
    background: #d7dde4;
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
  }
}

.layout-copy {
  text-align: center;
  padding: 15px 0 15px;
  color: #9ea7b4;
}
</style>
