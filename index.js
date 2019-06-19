/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
    let hasError;
    let result = [];
    
    if (!operations.length) {
        callback(null, []);
    }
    
    operations.forEach(function(fn, index) {
        fn(function(err, data) {
            if (hasError) {
                return;
            } else if (err) {
                callback(err);
                hasError = true;
            } else {
                result[index] = data;
                if (result.length === operations.length 
                    && !result.includes(undefined)) {
                    callback(null, result);
                }
            }
        })
    })
};