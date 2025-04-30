import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { ConfigService } from '@nestjs/config';
import { emailConstants } from '../common/constants/email.constants';
import { EmailTypeEnum } from '../common/enums/email-type.enum';
import { EmailTypeToPayloadType } from '../common/types/email-type-to-payload.type';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('config.smtp.smtpEmail'),
        pass: this.configService.get<string>('config.smtp.smtpPassword'),
      },
    });
  }

  private compileTemplate(templateName: string, context: any): string {
    const filePath = path.join(
      process.cwd(),
      'src',
      'templates',
      'views',
      `${templateName}.hbs`,
    );
    const source = fs.readFileSync(filePath, 'utf-8');
    const template = handlebars.compile(source);
    return template(context);
  }

  public async sendEmail<T extends EmailTypeEnum>(
    type: T,
    to: string,
    context: EmailTypeToPayloadType[T],
  ): Promise<void> {
    const { subject, template } = emailConstants[type]; // Ось тут отримуємо шаблон і тему

    // Компілюємо шаблон з контекстом
    const html = this.compileTemplate(template, context);

    // Відправка email
    await this.transporter.sendMail({
      from: this.configService.get<string>('smtp.smtpEmail'),
      to,
      subject,
      html,
    });
  }
}
