describe('My First Test', () => {
    it('開啟後台首頁', () => {
        cy.visit("localhost:9005")
    })
    it('開啟後台渠道管理，進行渠道新增', () => {
        cy.visit("localhost:9005/#/channel");

        cy.get('.ant4-pro-table-list-toolbar-title > .ant4-btn').click();

        // 渠道配置标签
        cy.get('#control-hooks_name')
            .type(String("渠道標籤名稱1"))
            .should('have.value', '渠道標籤名稱1')

        // 测试登录帳號
        // cy.get('#control-hooks_auditAcc')
        //     .type(String("0123456789"))
        //     .should('have.value', '0123456789')

        // 测试登录帳號(錯誤)
        cy.get('#control-hooks_auditAcc')
            .type(String("012345678"))
            .should('have.value', '012345678')

        // cy.get('.ant4-form-item-explain-error')
        //     .should('have.value', "请填写10位数字")


        // 测试登录验证码
        cy.get('#control-hooks_auditAccOtpCode')
            .type(String("123456"))
            .should('have.value', '123456')

        // 本金
        cy.get('#control-hooks_auditLoanAmount')
            .type(String("1000"))
            .should('have.value', '1000')

        // 服务费
        cy.get('#control-hooks_auditServiceFee')
            .type(String("10"))
            .should('have.value', '10')

        // 利息
        cy.get('#control-hooks_auditTaxFee')
            .type(String("1"))
            .should('have.value', '1')


        // 天数
        cy.get('#control-hooks_auditTerm')
            .type(String("1"))
            .should('have.value', '1')


        // 订单额度
        cy.get('#control-hooks_auditQuota')
            .type(String("15"))
            .should('have.value', '15')
    })
})
