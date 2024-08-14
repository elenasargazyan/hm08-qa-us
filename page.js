module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    paymentMethod:'//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[2]/div[1]',
    addCard:'//*[@id="root"]/div/div[2]/div[2]/div[1]/div[2]/div[3]',
    addNumber:'//*[@id="number"]',
    code:'.card-second-row #code',
    addingCard:'//*[@id="root"]/div/div[2]/div[2]/div[2]/div',
    linkButton:'//*[@id="root"]/div/div[2]/div[2]/div[2]/form/div[3]/button[1]',
    massages:'#comment',
    orderBlanket:'//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[1]/div/div[2]',
    blanketButtonStatus: '.switch-input',
    iceCrem:'//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[3]',
    serchModel:'//*[@id="root"]/div/div[3]/div[4]/button',
    carSearchPopup: 'div=Car search',
    serchChenge:'//*[@id="root"]/div/div[5]/div[2]/div[1]/div/div[2]',
    iceCremNumber:'//*[@id="root"]/div/div[3]/div[3]/div[2]/div[2]/div[4]/div[2]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[2]',
    cardAddd:'#root > div > div.payment-picker.open > div.modal > div.section.active > div.pp-selector > div:nth-child(3) > div.pp-title',


    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    // Modals
    phoneNumberModal: '.modal',
    suportivePlan:'//*[@id="root"]/div/div[3]/div[3]/div[2]/div[1]/div[5]',
    driverWillArriveModal: 'div*=The driver will arrive',
    orderButton: '.smart-button-main=Order',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    addingCreditCard: async function(number, CVV){
        const paymentMethod = await $(this.paymentMethod);
        await paymentMethod.waitForDisplayed();
        await paymentMethod.click();

        const addCard = await $(this.addCard);
        await addCard.waitForDisplayed();
        await addCard.click();

        const addNumber = await $(this.addNumber);
        await addNumber.setValue(number);
        
        const code = await $(this.code);
        await code.setValue(CVV);
       
        const addingCard = await $(this.addingCard);
        await addingCard.click();

        const linkButton = await $(this.linkButton);
        await linkButton.click();
},
    messageForDriver:async function(massage){
        const massages = await $(this.massages);
        await massages.waitForDisplayed();
        await massages.setValue(massage);


    },
    orderBlanketAndHandkerchiefs:async function(){
        await this.selectSupportivePlan();
        const orderBlanket = await $(this.orderBlanket);
        await orderBlanket.click();

    },

    orderingIceCreams:async function(){
        await this.selectSupportivePlan();
        const iceCrem = await $(this.iceCrem);
        await iceCrem.click();
        await iceCrem.click();

    },
    carSearchModal: async function(){
        const serchModel= await $(this.serchModel);
        await serchModel.click();
        await serchModel.waitForDisplayed();


    },

    modelChang: async function(){
        const serchChenge = await $(this.serchChenge);
        
        const orderButton = await $(this.orderButton);
        await orderButton.waitForDisplayed();
        await orderButton.click();

    },
    selectSupportivePlan: async function(){
        const suportivePlan = await $(this.suportivePlan);
        await suportivePlan.waitForDisplayed();
        await suportivePlan.click();


    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
};