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
        files: [
          {
            src: 'dist/js/index.js',
            dest: 'dist/js/index.min.js'
          }
        ]
      }
    },
  //  imagemin: {
    //  dynamic: {
      //  files: [{
        //  expand: true,
          //cwd: 'src/assets/images',
          //src: ['**/*.{png,gif}'],
          //dest: 'src/assets/images'
        //}]
    //  }
    //},*/
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
          width: 160/*320,180*/
        },{
          width:320/*640,360*/
        },{
          width: 450/*900,506*/
          /*suffix: "_900"*/
        },{
          width: 600 /*1200,675*/
        }
      ]
      },
      files: [{
        expand: true,
        src: ['**.{jpg,gif,png,svg}'],
        cwd: 'src/assets/images/',
        dest: 'dist/assets/images/seven/'
      }]
    }
  },/*,
  sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {                         // Dictionary of files
          'dist/css/main.css': 'src/css/main.scss'
        }
      }
    }
  ,
    purifycss: {
    options: {},
    target: {
      src: ['index.html', 'dist/js/*.js'],
      css: ['src/css/eightAwardWinners.css'],
      dest: 'src/css/eightAwardWinners.css'
    },
  },*/
  cmq: {
  options: {
    log: false
  },
  your_target: {
    files: {
      'dist/css/style.scss': ['dist/css/style.scss']
    }
  }
}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-img');
  /*grunt.loadNpmTasks('grunt-image-resize');*/
  grunt.loadNpmTasks('grunt-combine-media-queries');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-purifycss');
/*
module.exports = function(grunt) {
  grunt.initConfig({

  });

  grunt.registerTask('default', 'cmq');
};*/

//  grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'img','responsive_images','sass','purifycss']);
    grunt.registerTask('default', ['uglify']);
};
