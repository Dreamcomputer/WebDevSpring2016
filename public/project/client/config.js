/**
 * Created by Rammer on 6/14/16.
 */

"use strict";
(function() {
    angular
        .module("CheckLogApp")
        .config(function($routeProvider) {
            $routeProvider
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: "RegisterController"
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: "LoginController"
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: "ProfileController"
                })
                .when("/home", {
                    templateUrl: "views/home/home.view.html",
                    controller: "MainController"
                })
                .when("/log", {
                    templateUrl: "views/log/log.view.html",
                    controller: "LogController"
                })
                .otherwise({
                    redirectTo: "/home"
                })
        })
})();