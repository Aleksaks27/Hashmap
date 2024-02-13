class HashMap {
    constructor(size) {
        this.bucket = new Array(size);
    }
    // The load factor is the ratio of filled spaces to total array length. When this exceeds 0.75
    // the bucket's size is doubled by adding a series of undefined elements.
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
    // Each new entry is given a bucket index using the hashing algorithm below. This uses the
    // character code of each letter in the string plus prime number multiplication to generate
    // a number. Using integer division, a corresponding index is returned. Collisions may occur.
    hash(data) {
        let hashCode = 0;
        const prime = 31;

        for (let i = 0; i < data.length; i++) {
            hashCode = hashCode * prime + data.charCodeAt(i);
        }
        return hashCode % this.bucket.length;
    }
    // Based on the hashing algorithm, insert data at the right location in the bucket.
    set(key, value) {
        if (key < 0 || key >= this.bucket.length) {
            throw new Error("Trying to access index out of bounds");
          }
        this.bucket[key] = [key, value];
        this.expandMap();
    }
    // Find the data associated with an index.
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
    // Check if data exists at a certain index.
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
    // If data exists at an index, remove it by setting it to undefined. Otherwise return false.
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
    // Return the number of (defined) entries within the bucket.
    length() {
        let total = 0;
        for (let entry of this.bucket) {
            if (entry) total++;
        }
        return total;
    }
    // Clear out all entries by setting them to undefined.
    clear() {
        for (let i = 0; i < this.bucket.length; i++) {
            if (this.bucket[i]) this.bucket[i] = undefined;
        }
    }
    // Retrieve only the non-empty indices
    keys() {
        let keyArr = [];
        for (let entry of this.bucket) {
            if (entry) keyArr.push(entry[0]);
        }
        return keyArr;
    }
    // Retrieve the values at those indices.
    values() {
        let valArr = [];
        for (let entry of this.bucket) {
            if (entry) valArr.push(entry[1]);
        }
        return valArr;
    }
    // Retrieve both.
    entries() {
        let entryArr = [];
        for (let entry of this.bucket) {
            if (entry) entryArr.push(entry);
        }
        return entryArr;
    }
}