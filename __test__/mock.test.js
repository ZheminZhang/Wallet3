const myMock = jest.fn();

const a = new myMock();
const b = {};
const bound = myMock.bind(b);
bound();
console.log(myMock.mock.instances)

test('mock instances', ()=>{
	expect(myMock.mock.instances.length).toBe(2);
});
