describe('Sample Unit Testing', function(){

	var a = 1;
	it('should be equal to one.', function(){
		expect(a).toBe(1);
	}); 


	it('should do simple addition.', function(){
		expect(1+1).toBe(2);
	}); 


	it("should work for objects.", function() {
		var foo = {
			a: 12,
			b: 34
		};
		var bar = {
			a: 12,
			b: 34
		};
		expect(foo).toEqual(bar);
    });


});