package com.manager.user.app.service.impl;

import com.manager.user.app.constant.EmailConstants;
import com.manager.user.app.service.EmailService;
import com.sun.mail.smtp.SMTPTransport;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
    @Override
    public void sendNewPasswordEmail(String firstName, String password, String email) throws MessagingException {
        Message message = createEmail(firstName , password, email);
        SMTPTransport smtpTransport = (SMTPTransport) getEmailSession()
                .getTransport(EmailConstants.SIMPLE_MAIL_TRANSFER_PROTOCOL);
        smtpTransport.connect(
                EmailConstants.GMAIL_SMTP_SERVER,
                EmailConstants.USERNAME,
                EmailConstants.PASSWORD
        );
        smtpTransport.sendMessage(message, message.getAllRecipients());
        smtpTransport.close();
    }

    @Override
    public Message createEmail(String firstName, String password, String email) throws MessagingException {
        Message message = new MimeMessage(getEmailSession());
        message.setFrom(new InternetAddress(EmailConstants.FROM_EMAIL));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(email, false));
        message.setRecipients(Message.RecipientType.CC, InternetAddress.parse(EmailConstants.CC_EMAIL, false));
        message.setSubject(EmailConstants.EMAIL_SUBJECT);
        message.setText("Hello " + firstName + ", \n \n Your new account password is: " + password + "\n \n The Support Team");
        message.setSentDate(new Date());
        message.saveChanges();
        return message;
    }

    @Override
    public Session getEmailSession() {
        Properties properties = System.getProperties();
        properties.put(EmailConstants.SMTP_HOST, EmailConstants.GMAIL_SMTP_SERVER);
        properties.put(EmailConstants.SMTP_AUTH, true);
        properties.put(EmailConstants.SMTP_PORT, EmailConstants.DEFAULT_PORT);
        properties.put(EmailConstants.SMTP_STARTTLS_ENABLE, true);
        properties.put(EmailConstants.SMTP_STARTTLS_REQUIRED, true);
        return Session.getInstance(properties, null);
    }
}
