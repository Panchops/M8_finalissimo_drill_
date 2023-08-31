const { Bootcamp, User } = require('../models');

const createBootcamp = async (req, res) => {
  try {
    const { title, cue, description } = req.body;

    if (!(title && cue && description)) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    const bootcamp = await Bootcamp.create({
      title,
      cue,
      description,
    });

    console.log(`Se ha creado el bootcamp:\n${JSON.stringify(bootcamp, null, 4)}`);
    
    res.status(201).json({
      message: `Bootcamp ${bootcamp.name} fue creado con éxito`,
      Bootcamp: bootcamp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const addUserToBootcamp = async (req, res) => {
  try {
    const { BootcampId, userId } = req.body;

    const bootcamp = await Bootcamp.findByPk(BootcampId);
    if (!bootcamp) {
      res.status(404).json({
        message: `No se encontró bootcamp con id ${BootcampId}`,
      });
      return;
    }

    const usuario = await User.findByPk(userId);
    if (!usuario) {
      res.status(404).json({
        message: `No se encontró usuario con id ${userId}`,
      });
      return;
    }

    await bootcamp.addUser(usuario);
    console.log(`Agregado el usuario id ${usuario.id} al bootcamp con id ${bootcamp.id}`);

    res.status(201).json({
      message: `Se agregó el usuario id ${usuario.id} al bootcamp con id ${bootcamp.id}`,
      Bootcamp: bootcamp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const findBootcampById = async (req, res) => {
  try {
    const { id } = req.params;
    const bootcamp = await Bootcamp.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email', 'password'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!bootcamp) {
      res.status(404).json({
        message: `Bootcamp id ${id} no fue encontrado`,
      });
      return;
    }

    console.log(`Se ha encontrado el bootcamp:\n${JSON.stringify(bootcamp, null, 4)}`);
    
    res.status(200).json({
      message: `Bootcamp ${bootcamp.title} fue encontrado con éxito`,
      Bootcamp: bootcamp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const findAllBootcamps = async (req, res) => {
  try {
    const bootcamps = await Bootcamp.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName', 'email'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    console.log(`Se han encontrado los bootcamps:\n${JSON.stringify(bootcamps, null, 4)}`);
    
    res.status(200).json({
      message: `Se encontraron ${bootcamps.length} bootcamps`,
      Bootcamps: bootcamps,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateBootcampById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!(id && name && description)) {
      res.status(400).json({ message: 'Todos los campos son requeridos' });
      return;
    }

    const actualizados = await Bootcamp.update(
      {
        name,
        description,
      },
      {
        where: { id },
      }
    );

    if (!actualizados[0]) {
      res.status(404).json({
        message: `Bootcamp id ${id} no fue encontrado`,
      });
      return;
    }

    console.log(`Bootcamp id ${id} fue actualizado con éxito`);
    res.status(201).json({
      message: `Bootcamp id ${id} fue actualizado con éxito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteBootcampById = async (req, res) => {
  try {
    const { id } = req.params;
    const borrados = await Bootcamp.destroy({
      where: { id },
    });

    if (!borrados) {
      res.status(404).json({
        message: `Bootcamp id ${id} no fue encontrado`,
      });
      return;
    }

    console.log(`Bootcamp id ${id} fue borrado con éxito`);
    res.status(201).json({
      message: `Bootcamp id ${id} fue borrado con éxito`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBootcamp,
  addUserToBootcamp,
  findBootcampById,
  findAllBootcamps,
  updateBootcampById,
  deleteBootcampById,
};
