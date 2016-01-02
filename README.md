# react-native-pageview

### Example1

	var PageView = require('./pageView');
	var index = 0;
	var data = [
	  { id: index++, section: false, name: 'Test1' },
	  { id: index++, section: true, name: 'Page1' },
	  { id: index++, section: false, name: 'Test2' },
	  { id: index++, section: false, name: 'Test3' },
	  { id: index++, section: false, name: 'Test4' },
	  { id: index++, section: false, name: 'Test5' },
	  { id: index++, section: true, name: 'Page2' },
	  { id: index++, section: false, name: 'Test6' },
	  { id: index++, section: false, name: 'Test7' },
	  { id: index++, section: false, name: 'Test8' },
	  { id: index++, section: true, name: 'Page3' },
	  { id: index++, section: false, name: 'Test9' },
	  { id: index++, section: false, name: 'Test10' },
	  { id: index++, section: true, name: 'Page4' },
	  { id: index++, section: false, name: 'Test11' },
	  { id: index++, section: false, name: 'Test12' },
	  { id: index++, section: false, name: 'Test13' },
	  { id: index++, section: false, name: 'Test14' },
	  { id: index++, section: false, name: 'Test15' },
	  { id: index++, section: true, name: 'Page5' },
	  { id: index++, section: false, name: 'Test16' },
	  { id: index++, section: false, name: 'Test17' },
	  { id: index++, section: false, name: 'Test18' },
	  { id: index++, section: false, name: 'Test19' },
	  { id: index++, section: false, name: 'Test20' },
	];
	var sectionLength = 6;

	<PageView data={data} sectionLength={sectionLength} />

