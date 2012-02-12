describe('declarative.parseOptions', function() {

    var subject = declarative;

    it('should convert an empty string to an empty object', function() {

        var result = subject.parseOptions('');

        expect(typeof result).toBe('object');

    });

    it('should throw an error if the input contains double quotes', function() {

        expect(function() {
            subject.parseOptions('"key": "value"');
        }).toThrow();

    });

    it('should convert single quoted key and value separated by colon', function () {

        var result = subject.parseOptions("'key':'value'");
        expect(result.key).toBe('value');

    });

    it('should convert single quoted key and value separated by colon and whitespaces', function () {

        var result = subject.parseOptions("'key'   :   'value'");
        expect(result.key).toBe('value');

    });

    it('should throw an error if a value has no quotes', function() {

        expect(function() {
            subject.parseOptions("'key':value");
        }).toThrow();

    });

    it('should convert key and value separated by colon even if the key has no quotes', function() {

        var result = subject.parseOptions("key:'value'");
        expect(result.key).toBe('value');

    });

    it('should convert key and value separated by colon and whitespaces even if the key has no quotes', function() {

        var result = subject.parseOptions("key    :    'value'");
        expect(result.key).toBe('value');

    });

    it('should convert key and value separated by colon even if the key contains a colon', function() {

        var result = subject.parseOptions("'k:ey':'value'");
        expect(result['k:ey']).toBe('value');

    });

    it('should convert key and value separated by colon even if the key contains a colon and a comma', function() {

        var result = subject.parseOptions("'k:ey,':'value'");
        expect(result['k:ey,']).toBe('value');

    });

    it('should convert a comma separated list of colon separated key value pairs', function() {

        var result = subject.parseOptions("'one':'one', 'two': 'two', 'three': 'three'");

        expect(result.one).toBe('one');
        expect(result.two).toBe('two');
        expect(result.three).toBe('three');

    });

    it('should convert a comma separated list of colon separated key value pairs even if all keys have no quotes', function() {

        var result = subject.parseOptions("one:'one',two: 'two',three:'three'");

        expect(result.one).toBe('one');
        expect(result.two).toBe('two');
        expect(result.three).toBe('three');

    });

    it('should convert a value containing an array to an array property', function() {

        var result = subject.parseOptions("key: ['1', '2', '3']");

        expect(result.key.length).toBe(3);

    });

});