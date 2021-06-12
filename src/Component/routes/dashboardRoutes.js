import {Customer} from "../customer/Customer";
import React from "react";
import {LoginConnectedComponent} from "../LoginComponent";
import {EquipmentConnectedList} from "../equipment/EquipmentList";
import {Equipment} from "../equipment/Equipment";
import {DashboardConnectedComponent} from "../DashboardComponent";
import {Appointment} from "../appointment/Appointment";
import {AppointmentConnectedList} from "../appointment/AppointmentList";
import {MyProfile} from "../MyProfile";
import {ChangePassword} from "../ChangePassword";
import {TestConnectedList} from "../test/TestList";
import {Test} from "../test/Test";
import {CustomerConnectedList} from "../customer/CustomerList";

export const dashboardRoutes = [
    {
        path: "/edit-customer/:id",
        component: <Customer></Customer>,
    },
    {
        path: "/new-customer",
        component: <Customer></Customer>,
    },
    {
        path: "/customer-list",
        component: <CustomerConnectedList></CustomerConnectedList>,
    },

    {
        path: "/edit-equipment/:id",
        component: <Equipment></Equipment>,
    },
    {
        path: "/new-equipment",
        component: <Equipment></Equipment>,
    },
    {
        path: "/equipment-list",
        component: <EquipmentConnectedList></EquipmentConnectedList>,
    },
    {
        path: "/new-test",
        component: <Test></Test>,
    },
    {
        path: "/edit-test/:id",
        component: <Test></Test>,
    },
    {
        path: "/test-list",
        component: <TestConnectedList></TestConnectedList>,
    },
    {
        path: "/edit-appointment/:id",
        component: <Appointment></Appointment>,
    },
    {
        path: "/new-appointment",
        component: <Appointment></Appointment>,
    },
    {
        path: "/appointment-list",
        component: <AppointmentConnectedList></AppointmentConnectedList>,
    },
    {
        path: "/dashboard",
        component: <DashboardConnectedComponent></DashboardConnectedComponent>,
    },
    {
        path: "/login",
        component: <LoginConnectedComponent></LoginConnectedComponent>,
    },
    {
        path: "/my-profile/:id",
        component: <MyProfile></MyProfile>,
    },
    {
        path: "/change-password/:id",
        component: <ChangePassword></ChangePassword>,
    },
    {
        path: "/",
        component: <LoginConnectedComponent></LoginConnectedComponent>,
    }
];
