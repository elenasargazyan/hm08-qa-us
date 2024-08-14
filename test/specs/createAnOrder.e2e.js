const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {

   it('should Setting the address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await expect($(page.fromField)).toHaveValue('East 2nd Street, 601');
        await expect($(page.toField)).toHaveValue('1300 1st St');

        
       
    })
    it('should Selecting Supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportivePlan();
        await expect($(page.suportivePlan)).toHaveElementClass('active');

       
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should Adding a credit card', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.addingCreditCard('123456789012','12');
        await expect($(page.addCard)).toHaveText('Card');

    })

    it('should Writing a message for the driver', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.messageForDriver('thank you');
        await expect($(page.massages)).toHaveValue('thank you');

    })

        it('should Ordering a Blanket and handkerchiefs', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.orderBlanketAndHandkerchiefs();
            await expect($(page.blanketButtonStatus)).toBeChecked();


     })


        it('should Ordering 2 Ice creams', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.orderingIceCreams();
            await expect($(page.iceCremNumber)).toHaveText('2');
     })

        it('should The car search modal appears', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            await page.carSearchModal();
            await expect($(`${page.carSearchPopup}`)).toBeExisting();
       
     })

        it('should Waiting for appears', async () => {
            await browser.url(`/`)
            await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
            const phoneNumber = helper.getPhoneNumber("+1");
            await page.submitPhoneNumber(phoneNumber);
            await page.modelChang();
            await browser.pause(40000);
            await expect($(`${page.driverWillArriveModal}`)).toBeExisting();
     })

});




    


   
   

