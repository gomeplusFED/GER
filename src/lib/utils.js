export const typeDecide = function(o, type) {
    return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
};
