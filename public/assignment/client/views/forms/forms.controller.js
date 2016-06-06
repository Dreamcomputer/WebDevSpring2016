/**
 * Created by Rammer on 5/18/16.
 */

(function() {
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController($scope, $rootScope, $location, FormService) {

        var vm = this;

        vm.formTitle;
        vm.forms = [];
        // for local function here;
        var selectedForm;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;

        var currentUser = $rootScope.currentUser;

        function init() {
                        FormService.findAllFormsForUser(currentUser._id)
                            .then(function(response) {
                                if (response.data) {
                                    vm.forms = response.data;
                                }
                            });
                    }
        init();

        var selectedFormId = null;

        function addForm(form) {
            if (vm.formTitle) {
                var newForm = {
                    title: vm.formTitle
                };
                FormService.createFormForUser(currentUser._id, newForm)
                    .then(function(response) {
                        if (response.data) {
                            // To simply refresh the page for new data
                            init();
                        }
                    });
            }
            vm.formTitle = null;
        }

        function updateForm(form) {
            // Array of form names for all the forms that a user has created
            var formNames = vm.forms.map(function(form) {
                return form.title
            });

            var updatedForm = {
                title: vm.formTitle
            }

            // To update a form if there is a valid form title and the user has selected a form to edit
            if (formNames.indexOf(vm.formTitle) && selectedForm._id != null) {
                FormService.updateFormById(selectedForm._id, updatedForm)
                    .then(function(response) {
                        if (response.data){
                            // To simply refresh the page for new data
                            init();
                        }
                    });
            }
            vm.formTitle = null;
        }

        function deleteForm(index) {
            var deleteFormId = vm.forms[index]._id;

            FormService.deleteFormById(deleteFormId)
                .then(function(response) {
                    if (response.data) {
                        // To simply refresh the page for new data
                        init();
                    }
            });
        }

        function selectForm(index) {
            selectedForm = vm.forms[index];
            vm.formTitle = selectedForm.title;
        }
    }
})();