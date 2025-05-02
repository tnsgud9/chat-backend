import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import * as YAML from 'yamljs';
import { join } from 'path';

interface SwaggerYamlSchema {
  info: {
    title: string;
    description: string;
    version: string;
  };
  components?: Record<string, any>;
  security?: any[];
  tags?: any[];
  servers?: any[];
}

export function setupSwagger(app: INestApplication): void {
  const swaggerYamlPath = join(__dirname, '..', 'swagger.yaml');
  const yamlDocument = YAML.load(swaggerYamlPath) as SwaggerYamlSchema;

  const { title, description, version } = yamlDocument.info;

  // DocumentBuilder에서 최소 메타 정보만 설정
  const config = new DocumentBuilder()
    .setTitle(title)
    .setDescription(description)
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [], // 필요시 모델 추가
    deepScanRoutes: true, // 전체 라우팅 탐색
  });
  const options: SwaggerCustomOptions = {
    raw: ['json'], // JSON API definition is still accessible (YAML is disabled)
  };

  // 외부 YAML에서 정의한 정보 병합
  document.components = {
    ...document.components,
    ...yamlDocument.components,
  };
  document.security = yamlDocument.security;
  document.tags = yamlDocument.tags;
  document.servers = yamlDocument.servers;

  SwaggerModule.setup('docs', app, document, options);
}
