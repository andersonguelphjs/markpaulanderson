module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/js/ml_media.js', 'src/js/test.js'],
        dest: 'dist/js/built.js',
      },
    },
    uglify: {
      dist: {
        files: [{
            src: 'src/js/ml_media.js',
            dest: 'dist/js/ml_media.min.js'
          },
          {
            src: 'dist/js/built.js',
            dest: 'dist/js/built.min.js'
          }
        ]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/assets/images',
          src: ['**/*.{png,gif}'],
          dest: 'src/assets/images'
        }]
      }
    },
    img: {

        // using only dirs with output path
        task1: {
            src: 'src/assets/images/*.jpg',
            dest: 'src/assets/images'
        }
    },/*
    image_resize: {
      resize: {
        options: {
          height: 138,
          width: 245
        },
        src: 'src/assets/images/*.png',
        dest: 'dist/assets/images/'
      }
    },*/
    responsive_images: {
    myTask: {
      options: {
        sizes: [
          {
            width: 600 /*1200*/
          },{
          width: 160/*320*/
        },{
          width: 320/*640*/
        },{
          width: 450/*900*/
          /*suffix: "_900"*/
        }]
      },
      files: [{
        expand: true,
        src: ['**.{jpg,gif,png}'],
        cwd: 'src/assets/images/',
        dest: 'dist/assets/images/'
      }]
    }
  },

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-img');
  /*grunt.loadNpmTasks('grunt-image-resize');*/
  grunt.loadNpmTasks('grunt-responsive-images');
/*
module.exports = function(grunt) {
  grunt.initConfig({
    cmq: {
      options: {
        log: false
      },
      your_target: {
        files: {
          'output': ['build/*.css']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.registerTask('default', 'cmq');
};*/

  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'img','responsive_images']);
};
