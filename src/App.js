import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

// Pages
const Home = React.lazy(() => import("./pages/Home"));
const Register = React.lazy(() => import("./pages/Register"));
const Login = React.lazy(() => import("./pages/Login"));
const FoodCategoryFront = React.lazy(() => import("./pages/FoodCategory"));
const AddToCart = React.lazy(() => import("./pages/AddToCart"));
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
//Admin Pages
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const WebFront = React.lazy(() => import("./pages/admin/WebFront"));
const MainSlider = React.lazy(() => import("./pages/admin/MainSlider"));
const EditMainSlide = React.lazy(() => import("./pages/admin/EditMainSlide"));
const FoodCategory = React.lazy(() => import("./pages/admin/FoodCategory"));
const EditFoodCategory = React.lazy(() => import("./pages/admin/EditFoodCategory"));
const SetMeals = React.lazy(() => import("./pages/admin/SetMeals"));
const EditSetMeal = React.lazy(() => import("./pages/admin/EditSetMeal"));
const AddOn = React.lazy(() => import("./pages/admin/AddOn"));
const EditAddOn = React.lazy(() => import("./pages/admin/EditAddOn"));
function App() {
  return (
    <Router>
      <Suspense fallback={<div></div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/foodCategory/:foodCategoryId" component={FoodCategoryFront} />
          <Route path="/addToCart/:setMealId" component={AddToCart} />
          <PrivateRoute path="/user/dashboard" component={UserDashboard} />
          <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute path="/admin/webFront" component={WebFront} />
          <AdminRoute path="/admin/mainSlider" component={MainSlider} />
          <AdminRoute path="/admin/editMainSlide/:mainSlideId" component={EditMainSlide} />
          <AdminRoute path="/admin/foodCategory" component={FoodCategory} />
          <AdminRoute path="/admin/editFoodCategory/:foodCategoryId" component={EditFoodCategory} />
          <AdminRoute path="/admin/setMeals" component={SetMeals} />
          <AdminRoute path="/admin/editSetMeal/:setMealId" component={EditSetMeal} />
          <AdminRoute path="/admin/addOn" component={AddOn} />
          <AdminRoute path="/admin/editAddOn/:addOnId" component={EditAddOn} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
