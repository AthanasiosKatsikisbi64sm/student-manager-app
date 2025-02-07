import { Selector } from 'testcafe';

fixture('Student Manager App Client Side Test')
    //Change the File to your directory path
    //Example:.page('file:///YourPath/StudentManagerApp/client/index.html'); 
    .page('file:///home/athanasioskatsikisbi64sm/Desktop/repos/StudentManagerApp/client/index.html');


test('Client Can Add A Student And See It At The Bottom Of The List', async (t) => {
    const studentList = Selector('#studentList li');
    
    await t
        .typeText('#name', 'Max Newman')
        .typeText('#age', '22')
        .typeText('#gender', 'Male')
        .click('button[type="submit"]')
        .wait(1000); 

    await t
        .scrollIntoView(studentList.nth(0))  
        .wait(500); 
    
    const addedStudent = studentList.withText('Max Newman');
    await t.expect(addedStudent.exists).ok('Max Newman Was Not Added Successfully');
    
    await t.scrollIntoView(studentList.withText('Max Newman'))
    .wait(5000); 
});