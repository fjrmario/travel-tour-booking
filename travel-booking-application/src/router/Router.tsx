import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Sign from "../pages/Sign";
import ManageBooking from "../pages/PersonalTour";
import ManageEdits from "../pages/ManageEdits";
import ManageTour from "../pages/ManageTour";
import AdminEdit from "../pages/AdminEdit";
import CreateTour from "../pages/CreateTour";
import AccountEdit from "../pages/AccountEdit";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/home" />}
      />
      <Route
        path="/home"
        element={<Home />}
      />
      <Route
        path="/tours"
        element={<Tours />}
      />
      <Route
        path="/tours/:id"
        element={<TourDetails />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/thank-you"
        element={<ThankYou />}
      />
      <Route
        path="/tours/search"
        element={<SearchResultList />}
      />
      <Route
        path="/sign"
        element={<Sign />}
      />
      <Route
        path="/manage"
        element={<ManageBooking />}
      />
      <Route
        path="/manage/edits/:id"
        element={<ManageEdits />}
      />
      <Route
        path="/manager"
        element={<ManageTour />}
      />
      <Route
        path="/manager/edit/:tourId"
        element={<AdminEdit />}
      />
      <Route
        path="/manager/is/creating"
        element={<CreateTour />}
      />
      <Route
        path="/account"
        element={<AccountEdit />}
      />
    </Routes>
  );
};

export default Router;
