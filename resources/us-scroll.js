(function(w){
    ScrollBar = {
        scrollKit: function(contentHolder){
            var html = contentHolder.innerHTML;
            contentHolder.innerHTML = "";

            this.wrapper = document.createElement('div');
            this.wrapper.className = "wrapper unselectable";

            this.content = document.createElement('div');
            this.content.className = "content";
            this.content.innerHTML = html;
            this.wrapper.appendChild(this.content);


            this.scrollBar = document.createElement('div');
            this.scrollBar.className = "scrollBar";
            this.wrapper.appendChild(this.scrollBar);

            contentHolder.appendChild(this.wrapper);

            this.wrapperHeight = this.wrapper.offsetHeight;
            this.scrollHeight = this.wrapper.scrollHeight;
            this.scrollPercentage = (this.wrapperHeight/this.scrollHeight) * 100;
            
            this.scrollBar.style.height = this.scrollPercentage + "%";
            
            // Attaching mouse events
            this.scrollBar.onmousedown = this.setScroll.bind(this);        

            // For scroll
            this.wrapper.onscroll = this.goScroll.bind(this);
        },
        setScroll: function(e){
            this.addEvent('mousemove', document, this.beginScroll.bind(this));
            this.addEvent('mouseup', document, this.endScroll.bind(this));

            // disable scroll event
            this.removeEvent('scroll', this.wrapper)
            this.offsetTop = this.wrapper.offsetTop;
            this.firstY = e.pageY;
        },
        beginScroll: function(e){
            // move the cursor position and also change the scrollPosition of the container.
            var wrapperScrollTop = this.wrapper.scrollTop;
            var top = (e.pageY - this.firstY);
            top = (top/this.wrapperHeight * 100); 
            if(!this.previousTop){
                this.previousTop = top + 1;
            }
            var blnThreshold = top >= 0 && this.firstY > this.offsetTop;
            if((this.previousTop > top && blnThreshold) || (blnThreshold && (wrapperScrollTop + this.wrapperHeight !== this.scrollHeight))){
                var threshold = 100 - this.scrollPercentage;
                this.scrollBar.style.top = top + "%";
                this.previousTop = top;
                var scrollTop = top * this.scrollHeight /100;
                this.wrapper.scrollTop = scrollTop;
            }
        },
        endScroll: function(e){
            this.removeEvent('mousemove', document);
            this.removeEvent('mouseup', document);

            // Enable scroll event
            this.addEvent('scroll', this.goScroll.bind(this));
        },
        goScroll: function(e){
            var element = e.currentTarget;
            var scrollTop = element.scrollTop;
            var top = scrollTop/this.scrollHeight * 100;
            this.scrollBar.style.top = top + "%";
        },
        addEvent: function(event, element, func){
            element['on' + event] = func;
        },
        removeEvent: function(event, element){
            element['on' + event] = null;
        },
    }
})(window);
