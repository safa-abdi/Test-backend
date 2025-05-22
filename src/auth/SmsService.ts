/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;
  private fromNumber: string;

  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!accountSid || !authToken || !fromNumber) {
      throw new Error(
        "Twilio configuration manquante dans les variables d'environnement.",
      );
    }

    this.twilioClient = new Twilio(accountSid, authToken);
    this.fromNumber = fromNumber;
  }

  async validateFromNumber(): Promise<void> {
    try {
      const validationRequest =
        await this.twilioClient.validationRequests.create({
          friendlyName: 'Mon numéro perso',
          phoneNumber: this.fromNumber,
        });

      console.log('✅ Validation demandée. SID:', validationRequest.accountSid);
      console.log(
        '📞 Twilio va appeler le numéro pour le valider (code vocal).',
      );
    } catch (error) {
      console.error('❌ Erreur de validation du numéro:', error);
      throw new Error('Échec de la validation du numéro: ' + error.message);
    }
  }

  async sendSms(to: string, message: string): Promise<void> {
    console.log('Numéro de téléphone reçu:', to);
    const otpCode = randomInt(100000, 1000000);
    console.log(`📲 Code OTP pour ${to}: ${otpCode}`);
    console.log(
      `📩 Message simulé: ${message.replace('{{CODE}}', otpCode.toString())}`,
    );
  }
}
