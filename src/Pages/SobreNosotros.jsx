import React from "react";
import { Card, CardBody, Button, Progress } from "@nextui-org/react";
import { Trophy, Users, Target } from "lucide-react";

export function SobreNosotros() {
  return (
    <section className="py-12 bg-gradient-to-r from-green-500 to-green-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Sobre Nosotros
        </h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p className="text-white text-lg">
              En Atlecesar, nos apasiona el deporte y creemos en su poder
              para transformar vidas. Desde nuestra fundación en 2010, hemos
              estado comprometidos con fomentar una comunidad deportiva vibrante
              y saludable.
            </p>
            <p className="text-white text-lg">
              Nuestro equipo está formado por atletas, entrenadores y
              entusiastas del deporte que comparten una visión común: hacer que
              el deporte sea accesible y emocionante para todos.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardBody className="flex flex-col items-center p-6">
                <Trophy className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-xl font-semibold mb-2">50+</h3>
                <p className="text-center text-gray-600">
                  Campeonatos Organizados
                </p>
              </CardBody>
            </Card>
            <Card>
              <CardBody className="flex flex-col items-center p-6">
                <Users className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-xl font-semibold mb-2">10,000+</h3>
                <p className="text-center text-gray-600">
                  Atletas Participantes
                </p>
              </CardBody>
            </Card>
            <Card className="col-span-2">
              <CardBody className="flex flex-col items-center p-6">
                <Target className="h-12 w-12 text-green-500 mb-2" />
                <h3 className="text-xl font-semibold mb-2">Nuestra Misión</h3>
                <p className="text-center text-gray-600">
                  Inspirar y capacitar a las personas a través del deporte,
                  promoviendo un estilo de vida activo y saludable en nuestra
                  comunidad.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Nuestro Impacto
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-white mb-2">Participación Comunitaria</p>
              <Progress color="danger" value={75} className="max-w-md" />
            </div>
            <div>
              <p className="text-white mb-2">Satisfacción de los Atletas</p>
              <Progress color="danger" value={90} className="max-w-md" />
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Button color="success" size="lg" className="font-semibold">
            Únete a Nuestra Comunidad
          </Button>
        </div>
      </div>
    </section>
  );
}
