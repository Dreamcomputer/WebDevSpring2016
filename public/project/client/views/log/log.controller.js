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

        var currentUser = $rootScope.currentUser;

        var fileContent;
        var fileName;





        console.log("ewkrjwehruiwyrewurkhkewj" + currentUser._id);
        function init() {
            // Put code to show today's check's here
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
            console.log("helloe");
            var log = {
                name: fileName,
                content: fileContent,
                userId: currentUser._id,
                date: vm.log.date,
                note: vm.log.note
            }
            if (log) {
                LogService.createCheckForUser(currentUser._id, log)
                    .then(function(response) {
                        if (response.data) {
                            // To simply refresh the page for new data
                            init();
                        }
                    });
            }
            vm.log.note = null;
        }

    }
})();