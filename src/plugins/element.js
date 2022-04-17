import Vue from 'vue'
import {
    Button,
    Row,
    Col,
    Input,
    Container,
    Header,
    Main,
    Aside,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Card,
    Image,
    Table,
    TableColumn,
    Breadcrumb,
    BreadcrumbItem,
    Tag,
    Dialog,
    MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Card)
Vue.use(Image)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Dialog)
Vue.prototype.$confirm=MessageBox.confirm;
