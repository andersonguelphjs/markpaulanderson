
flashApp.service('sharedProperties', function () {
        var objectValue = {level:1};

        return {
            getObjectValue: function () {
                return objectValue;
            },
            setObjectValue: function(key, value) {
                objectValue[key] = value;
            }
        };
    });
