/**
 * Created by Rammer on 6/15/16.
 */


(function() {
    angular
        .module("CheckLogApp")
        .controller("LogController", LogController);

    function LogController($scope, $rootScope, $location, LogService) {

        var vm = this;
        vm.addCheck = addCheck;
        vm.displayChecks = displayChecks;

        var currentUser = $rootScope.currentUser;

        var fileContent;
        var fileName;
        vm.title = "All Past Checks:";

        // For Log Display
        vm.logs = [];

        function init() {
            // Put code to show today's check's here
            LogService.findAlllogsForUser(currentUser._id)
                .then(function(response) {
                    if (response.data) {
                        vm.logs = response.data;
                        vm.title = "All Past Checks:";
                    }
                });
        }
        init();

        $scope.upload = function(el) {
            console.log("In new function");
            console.log(el.files[0].name);
            fileContent = el.files[0];
            fileName = el.files[0].name;
            console.log(fileContent);
        };

        function addCheck(log) {
            // Creating new log object
            var log = {
                name: fileName,
                content: fileContent,
                userId: currentUser._id,
                date: vm.log.date,
                note: vm.log.note
            };
            console.log("Pacific ocean : " + vm.log.date);
            if (log) {
                LogService.createCheckForUser(currentUser._id, log)
                    .then(function(response) {
                        if (response.data) {
                            // To simply refresh the page for new data
                            displayChecks(vm.log.date);
                            // Clearing all inputfields
                            vm.log.note = null;
                            vm.log.date = null;
                            vm.log = null;
                        }
                    });
            }
        }

        // Function for showing Checks for a Selected Date
        function displayChecks(date) {

            var selectedDate = date.toString().slice(0, 15);
            var formattedDate = date.toISOString().slice(0, 10);
            if (selectedDate) {
                LogService.displayChecksForUser(currentUser._id, formattedDate)
                    .then(function(response) {
                        if (response.data) {
                            vm.logs = response.data;
                            vm.title = "Checked Dated Since (" + selectedDate + ")";
                        }
                    })
            }

        }

    }
})();