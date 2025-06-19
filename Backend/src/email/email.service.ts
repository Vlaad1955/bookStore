import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import * as path from 'path';
import * as handlebars from 'handlebars';
import { EmailTypeEnum } from '../common/enums/email-type.enum';
import { EmailTypeToPayloadType } from '../common/types/email-type-to-payload.type';
import { emailConstants } from '../common/constants/email.constants';

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

    this.registerPartials();
  }

  private registerPartials() {
    const partialsDir = path.join(
      process.cwd(),
      'src',
      'templates',
      'partials',
    );
    handlebars.registerPartial(
      'header',
      readFileSync(path.join(partialsDir, 'header.hbs'), 'utf8'),
    );
    handlebars.registerPartial(
      'footer',
      readFileSync(path.join(partialsDir, 'footer.hbs'), 'utf8'),
    );
  }

  private compileTemplate(templateName: string, context: any): string {
    const viewsDir = path.join(process.cwd(), 'src', 'templates', 'views');
    const layoutDir = path.join(process.cwd(), 'src', 'templates', 'layouts');

    const templateContent = readFileSync(
      path.join(viewsDir, `${templateName}.hbs`),
      'utf8',
    );
    const layoutContent = readFileSync(
      path.join(layoutDir, 'main.hbs'),
      'utf8',
    );

    const template = handlebars.compile(templateContent);
    const compiledBody = template(context);

    const layout = handlebars.compile(layoutContent);
    return layout({ body: compiledBody, ...context });
  }

  public async sendEmail<T extends EmailTypeEnum>(
    type: T,
    email: string,
    context: EmailTypeToPayloadType[T],
  ): Promise<void> {
    const { subject, template } = emailConstants[type];
    const html = this.compileTemplate(template, context);

    await this.transporter.sendMail({
      to: email,
      subject,
      html,
      from: this.configService.get<string>('config.smtp.smtpEmail'),
    });
  }
}
