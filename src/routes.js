import Index from "./pages/PageIndex";
import Block from "./pages/PageBlock";
import Transactions from "./pages/PageTransactions";
import Transaction from "./pages/PageTransaction";
import Account from "./pages/PageAccount";
import AppPageNotFound from "./components/AppPageNotFound";

const routes = [
  { path: "/", component: Index },
  { path: "/:network/blocks/:block", name: "block", component: Block },
  { path: "/:network/txs/:block", name: "txs", component: Transactions },
  { path: "/:network/tx/:hash", name: "tx", component: Transaction },
  { path: "/:network/account/:address", name: "account", component: Account },
  { path: `*`, component: AppPageNotFound }
];

export default {
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
};
