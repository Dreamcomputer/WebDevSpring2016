/**
 * Created by Rammer on 5/18/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        var currentUser = $rootScope.currentUser;

        //Get the current array of forms for the currently logged in userf
        FormService.findAllFormsForUser(currentUser._id,
            function(response) {
                $scope.forms = response;
            });

        function addForm() {
            if ($scope.formTitle) {
                var newForm = {
                    title: $scope.formTitle
                }

                FormService.createFormForUser(currentUser._id, newForm,
                    function(response) {
                        $scope.forms = response;
                    });
            }
        }

        function updateForm() {
            // Array of form names for all the forms that a user has created
            var formNames = $scope.forms.map(function(form) {
                return form.title
            });

            var updatedForm = {
                title: $scope.formTitle
            }
            // To update a form if there is a valid form title and the user has selected a form to edit
            if (formNames.indexOf($scope.formTitle) && $scope.selectedFormId) {
                FormService.updateFormById($scope.selectedFormId, updatedForm,
                    function(response) {
                        $scope.forms = response;
                    });
            }
        }

        function deleteForm(index) {
            var deleteFormId = $scope.forms[index]._id;

            FormService.deleteFormById(deleteFormId, function(response) {
                $scope.forms = response;
            });
        }

        function selectForm(index) {
            $scope.selectedFormId = $scope.forms[index]._id;
            $scope.formTitle = $scope.forms[index].title;
        }
    }
})();