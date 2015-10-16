describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
        browser.get('http://localhost:8080');

        expect(completedAmount.count()).toEqual(2);
    });
});