class HashMap {
    constructor(size) {
        this.bucket = new Array(size);
    }
    
    expandMap() {
        let size = this.bucket.length;
        let loadFactor = this.length() / size;
    
        if (loadFactor >= 0.75) {
            while (size > 0) {
                this.bucket.push(undefined);
                size--;
            }
        }
    }

    hash(data) {
        let hashCode = 0;
        const prime = 31;

        for (let i = 0; i < data.length; i++) {
            hashCode += hashCode * prime + data.charCodeAt(i);
        }
        return hashCode % this.bucket.length;
    }

    set(key, value) {
        if (key < 0 || key >= this.bucket.length) {
            throw new Error("Trying to access index out of bounds");
          }
        this.bucket[key] = [key, value];
        this.expandMap();
    }

    get(key) {
        for (let entry of this.bucket){
            if (entry) {
                if (entry[0] === key) {
                    return entry[1];
                }
            }
        }
        return null;
    }

    has(key) {
        for (let entry of this.bucket){
            if (entry) {
                if (entry[0] === key) {
                    return true;
                }
            }
        }
        return false;
    }

    remove(key) {
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i]) {
                if (this.bucket[i][0] === key) {
                    this.bucket[i] = undefined;
                    return true;
                }
            }
        }
        return false;
    }

    length() {
        let total = 0;
        for (let entry of this.bucket) {
            if (entry) total++;
        }
        return total;
    }

    clear() {
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i]) this.bucket[i] = undefined;
        }
    }

    keys() {
        let keyArr = [];
        for (let entry of this.bucket) {
            if (entry) keyArr.push(entry[0]);
        }
        return keyArr;
    }

    values() {
        let valArr = [];
        for (let entry of this.bucket) {
            if (entry) valArr.push(entry[1]);
        }
        return valArr;
    }

    entries() {
        let entryArr = [];
        for (let entry of this.bucket) {
            if (entry) entryArr.push(entry);
        }
        return entryArr;
    }
}